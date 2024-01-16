<template>
    <div class="role-edit">
        <el-form :model="form" :rules="rules" ref="editRole" label-width="75px">
			<el-form-item prop="pid" label="父级">
			    <el-select v-model="form.pid" placeholder="请选择父级" style="width: 100%" @change="switchGroup">
			        <el-option v-for="item in roles" style="white-space: pre-wrap;" :key="item.id" :label="item.name" :value="item.id"></el-option>
			    </el-select>
			</el-form-item>
            <el-form-item prop="name" label="角色名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色状态">
                <el-switch
                    class="tablescope"
                    v-model="form.status"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
					:active-value="1"
					:inactive-value="0"
                    active-text="开启"
                    inactive-text="关闭"
                ></el-switch>
            </el-form-item>
            <el-form-item prop="menu_ids" label="角色权限">
                <div class='mb10'>
                    <el-checkbox v-model="checkAll" @change='checkAllFn' label="全部选中" border></el-checkbox>
                    <el-checkbox v-model="showAll" @change='showAllFn' label="全部展开" border></el-checkbox>
                </div>
                <el-tree
                    :data="menus"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-checked-keys="menuIds"
                    :default-expand-all="true"
                    :props="defaultProps"
					:check-strictly="false"
                ></el-tree>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveEdit" :loading="loading">确定编辑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { editRole,roleInfo } from '../../api/auth/role';
import { menuRead } from '../../api/auth/menu';
export default {
    name: 'editRole',
    props: {
        roleId: {},
    },
    data() {
        return {
            loading: false,
            menus: [],
            defaultProps: {
                label: 'name',
                children: 'children'
            },
			roles: {},
			menuIds: [],
            form: {
                pid: 0,
                id: 0,
                name: '',
                status: '',
                status_name: true,
                menu_ids: []
            },
            rules: {
				pid: [{ required: true, message: '请选择父级', trigger: 'blur' }],
                name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
                // menu_ids: [{ required: true, message: '请选择权限', trigger: 'blur' }]
            },
            checkAll: false,
            showAll: true,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取菜单列表
        getData() {
            // menuTree({}).then((res) => {
            //     this.menus = res.data;
            //     this.getInfo();
            // });
			this.getInfo();
        },
        // 获取角色详情
        getInfo() {
            roleInfo({ id: this.roleId }).then((res) => {
                // this.form.id = res.data.id;
                // this.form.pid = res.data.pid;
                // this.form.name = res.data.name;
                // this.form.status = res.data.status;
                // this.form.menu_ids = res.data.menu;
				
				// 把角色列表里面的当前角色删除（防止选择自己为自己上级）				
				// var index = this.roleGroupCopy.findIndex(item => item.id == this.form.id);
				// if (index !== -1) {
				//   this.roleGroupCopy.splice(index, 1);
				// }
				
				this.menus = res.data.menus;
				this.roles = res.data.roleGroup;
				this.menuIds = res.data.menuIds;
				this.form = res.data.roles;
            });
        },
        // 保存编辑
        saveEdit() {
            // this.form.menu_ids = this.$refs.tree.getCheckedKeys();
            this.menuIds = this.$refs.tree.getCheckedKeys();
            this.$refs.editRole.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    var data = {
                        id: this.form.id,
                        pid: this.form.pid,
                        name: this.form.name,
                        status: this.form.status,
                        menu_ids: this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
                    };
                    editRole(data).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('编辑成功');
                            this.$emit('on-success', true);
                        } else {
                            this.$message.error(res.msg);
                            this.loading = false;
                        }
                    });
                }
            });
        },
		switchGroup(id){
			menuRead({ role_id: id }).then((res) => {
				this.menus = res.data;
			});
		},
        //全选/全不选
        checkAllFn(){
            if(this.checkAll){
                const menus = this.menus;
                for (let i = 0; i < menus.length; i++) {
                    this.$refs.tree.setChecked(menus[i].id,true,true);
                }
            }else{
                this.$refs.tree.setCheckedKeys([]);
            }
        },
        //展开/收缩
        showAllFn(){
            const menus = this.menus;
            let treeRef = this.$refs.tree;
            this.openOrShow(menus,treeRef);
        },
        //递归展开收缩
        openOrShow(menus,refs){
            menus.forEach((item,index) => {
                refs.store.nodesMap[menus[index].id].expanded = this.showAll;
                if(item.children && item.children.length > 0){
                    let newRef = refs.store.nodesMap[menus[index].id];
                    this.openOrShow(item.children,newRef);
                }
            })
        }
    }
};
</script>

<style lang="scss">
.tablescope {
    .el-switch__label--left {
        position: relative;
        left: 55px;
        color: #fff;
        z-index: -100;
    }
    .el-switch__core {
        width: 55px !important;
    }
    .el-switch__label--right {
        position: relative;
        right: 55px;
        color: #fff;
        z-index: -100;
    }
    .el-switch__label--right.is-active {
        z-index: 100;
        color: #fff !important;
    }
    .el-switch__label--left.is-active {
        z-index: 100;
        color: #777777 !important;
    }
    .el-switch__label * {
        font-size: 12px;
    }
}
.role-edit .el-switch {
    margin-left: -30px;
}


//.el-tree-node.is-expanded>.el-tree-node__children .el-tree-node{
//    float: left;
//      .el-tree-menu .el-tree-node .el-tree-node__children .el-tree-node
//      .el-tree-menu .el-tree-node .el-tree-node__children .el-tree-node.is-expanded
//  .el-tree .el-tree-node .el-tree-node__children>.el-tree-node>.el-tree-node__children>.el-tree-node
//}
.el-tree .el-tree-node .el-tree-node__children .el-tree-node{
    float: left;
}
</style>
<template>
    <div class="menu-list" style="padding-bottom: 60px;">
        <div class="container">
            <el-button type="primary" v-if="auth('menu/save')" icon="el-icon-circle-plus-outline" class="mt20" @click="handleCreate(-1)">添加</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
			
			<el-table :data="data" class="table" ref="multipleTable" v-loading="listLoading" header-cell-class-name="table-header" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
			    <el-table-column prop="name" label="菜单名称"></el-table-column>
			    <el-table-column prop="alias" label="别名"></el-table-column>
			    <el-table-column prop="action" label="路由"></el-table-column>
			    <el-table-column prop="sort" label="排序"></el-table-column>
			    <el-table-column label="图标">
			        <template slot-scope="scope">
			            <i :class="scope.row.icon" style="font-size: 18px"></i>
			        </template>
			    </el-table-column>
				<el-table-column label="状态" align="center">
				    <template slot-scope="scope">
				        <el-switch
				            class="tablescope"
				            @change="changeStatus($event, scope.row.id)"
				            v-model="scope.row.status"
				            active-color="#409EFF"
				            inactive-color="#dcdfe6"
							:active-value="1"
							:inactive-value="0"
				            active-text="显示"
				            inactive-text="隐藏"
                            :disabled="!auth('menu/quickStatus')"
				        ></el-switch>
				    </template>
				</el-table-column>
			    <el-table-column prop="create_time" label="创建时间"></el-table-column>
			    <el-table-column label="操作" width="180px" align="center">
			        <template slot-scope="scope">
			    		<el-tooltip v-if="auth('menu/save')" class="item" effect="dark" content="在当前菜单新增" placement="top">
			    			<el-button icon="el-icon-plus" type="primary" @click="handleCreate(scope.row.id)" circle></el-button>
			    		</el-tooltip>
			    		<el-tooltip v-if="auth('menu/edit')" class="item" effect="dark" content="编辑" placement="top">
			    			<el-button icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)" circle></el-button>
			    		</el-tooltip>
			    		<el-tooltip v-if="auth('menu/del')" class="item" effect="dark" content="删除" placement="top">
			    			<el-button icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
			    		</el-tooltip>
						<el-tooltip class="item" effect="dark" content="增加CRUD" placement="top">
							<el-button v-if="userInfo.is_admin == 1" icon="el-icon-plus" type="primary" @click="handleCrud(scope.row.id)" circle></el-button>
						</el-tooltip>
			        </template>
			    </el-table-column>
			</el-table>
        </div>
        <!-- 添加弹出框 -->
        <drawer title="添加菜单" :display.sync="createVisible" :width="drawerWidth">
            <create-menu v-if="createVisible == true" :pid="pid" @on-success="onSuccess"></create-menu>
        </drawer>
        <!-- 编辑弹出框 -->
        <drawer title="编辑菜单" :display.sync="editVisible" :width="drawerWidth">
            <edit-menu v-if="editVisible == true" :menuInfo="menuInfo" @on-success="onSuccess"></edit-menu>
        </drawer>
		
		<el-dialog title="一键生成CRUD" :visible.sync="crudVisible" width="30%" append-to-body>
			<el-form label-width="180px" label-position="left">
				
			    <el-form-item label="要一键生成的方法">
					 <el-checkbox-group v-model="actions">
					    <el-checkbox label="index">查看</el-checkbox>
					    <el-checkbox label="save">新增</el-checkbox>
					    <el-checkbox label="quickStatus">快捷开关</el-checkbox>
					    <el-checkbox label="edit">编辑</el-checkbox>
					    <el-checkbox label="del">删除</el-checkbox>
					</el-checkbox-group>
			    </el-form-item>
			    <el-form-item>
			        <el-button type="primary" @click="menuCrudFn" :loading="loading">一键生成</el-button>
			    </el-form-item>
			</el-form>
		</el-dialog>
    </div>
</template>

<script>
import drawer from '../../components/Drawer';
import editMenu from './Edit';
import createMenu from './Create';
import { delMenu,menuList,quickEditMenu,menuCrud } from '../../api/auth/menu';
import { checkAuth } from '../../utils/common';
export default {
    name: 'menus',
    components: { createMenu, editMenu, drawer },
    data() {
        return {
			loading:false,
            drawerWidth: '500px',
            data: [],
			pid:0,
            menuInfo: {},
            createVisible: false,
            editVisible: false,
			listLoading: false,
			
			crudVisible: false,
			
			actions: [],
			userInfo: {},
        };
    },
    created() {
        this.getData();
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    methods: {
        // 获取菜单列表
        getData() {
			this.listLoading = true;
            menuList({}).then((res) => {
                this.data = res.data;
				this.listLoading = false;
            });
        },
        // 刷新
        handleRefresh() {
            this.getData();
        },
        // 快捷修改状态
        changeStatus($event, id) {
            var status = 0;
            if ($event == false) {
                status = 0;
            }
            if ($event == true) {
                status = 1;
            }
            quickEditMenu({ id: id, status: status }).then((res) => {
                if (res.code == 200) {
                    this.$message.success('操作成功');
                } else {
                    this.$message.error(res.msg);
					this.getData();
                }
            });
        },
        // 添加
        handleCreate(pid) {
			this.pid = pid;
            this.createVisible = true;
        },
        // 编辑
        handleEdit(row) {
            this.menuInfo = row;
            this.editVisible = true;
        },
        // 添加、编辑成功回调
        onSuccess() {
            this.createVisible = false;
            this.editVisible = false;
            this.getData();
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
			.then(() => {
				delMenu({ id: row.id }).then((res) => {
					if (res.code == 200) {
						this.$message.success('删除成功');
						this.getData();
					} else {
						this.$message.error(res.msg);
					}
				});
			})
			.catch(() => {});
        },
		handleCrud(pid){
			this.pid = pid;
			this.crudVisible = true;
		},
		menuCrudFn(){
			var obj = {
				menu_id:this.pid,
				actions:this.actions,
			};
			menuCrud(obj).then((res) => {
				if (res.code == 200) {
					this.$message.success('操作成功');
					this.crudVisible = false;
					this.getData();
				} else {
					this.$message.error(res.msg);
				}
			});
			
		}
    }
};
</script>

<style lang="scss">
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.handle-box {
    margin-bottom: 20px;
}
.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 12px;
}
.mr10 {
    margin-right: 10px;
}
.mt20 {
    margin-bottom: 20px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
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
</style>
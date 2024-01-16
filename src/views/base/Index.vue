<template>
    <div class="menu-list" style="padding-bottom: 60px;">
        <div class="container">
			<el-input v-model="query.mobile" placeholder="手机号" class="handle-input mr10"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="handleRefresh">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" class="mt20" @click="handleCreate">添加</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
            <el-table :data="data" class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="手机号">
					<template slot-scope="scope">{{scope.row.mobile}}</template>
				</el-table-column>
                <el-table-column label="昵称">
					<template slot-scope="scope">{{scope.row.nickname}}</template>
				</el-table-column>
				<el-table-column label="推广码">
					<template slot-scope="scope">{{scope.row.uasd}}</template>
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
                            active-text="启用"
                            inactive-text="禁用"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
					<template slot-scope="scope">{{scope.row.create_time}}</template>
				</el-table-column>
                <el-table-column label="操作" width="180px" align="center">
                    <template slot-scope="scope">
                        <el-button
							icon="el-icon-edit" type="primary" 
							@click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
							icon="el-icon-delete"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
		<div class="pagination">
		  <el-pagination
		      background
		      layout="total, prev, pager, next"
		      :current-page="query.pageNum"
		      :page-size="query.pageSize"
		      :total="total"
		      @current-change="handlePageChange"
		  ></el-pagination>
		</div>
        <!-- 添加弹出框 -->
        <drawer title="添加" :display.sync="createVisible" :width="drawerWidth">
            <create-menu v-if="createVisible == true" @on-success="onSuccess"></create-menu>
        </drawer>
        <!-- 编辑弹出框 -->
        <drawer title="编辑" :display.sync="editVisible" :width="drawerWidth">
            <edit-menu v-if="editVisible == true" :editInfo="editInfo" @on-success="onSuccess"></edit-menu>
        </drawer>
    </div>
</template>

<script>
import drawer from '../../components/Drawer';
import editMenu from './Edit';
import createMenu from './Create';
import * as api from '../../api/base';
export default {
    name: 'menus',
    components: { createMenu, editMenu, drawer },
    data() {
        return {
            drawerWidth: '500px',
            data: [],
            editInfo: {},
            createVisible: false,
            editVisible: false,
			query:{
				mobile:'',
				pageNum: 1,
				pageSize: 15
			},
			total:0,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取菜单列表
        getData() {
            api.reqList(this.query).then((res) => {
                this.data = res.data.list;
				this.total = res.data.total;
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
            api.reqQuickEdit({ id: id, status: status }).then((res) => {
                if (res.code == 200) {
                    this.$message.success('修改成功');
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 添加
        handleCreate() {
            this.createVisible = true;
        },
        // 编辑
        handleEdit(row) {
            this.editInfo = row;
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
				api.reqDel({ id: row.id }).then((res) => {
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
		// 分页
		handlePageChange(val) {
		  this.$set(this.query, 'pageNum', val);
		  this.getData();
		},
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
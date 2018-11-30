<template>
  <div class="container" :class="{container_collapse:collapse}">
  
    <p class="page_title">物料清单</p>
  
    <div class="btn-box">
  
      <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
  
      <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
  
      <button :disabled='doPrint' :class="{button_btn:!doPrint}" @click="doPrints">打印</button>
  
      <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
  
      <input type="text" placeholder="请输入产品的设计款号" class="doSearch" v-model="search">
  
      <button @click="doSearchs" :class="{button_btn:!doSearch}" :disabled="doSearch">查询</button>
  
      <button class="button_btn" @click="doOuts">退出</button>

  
      <div class="btn_right">
  
        <button :disabled="list.length==0||list[0].sh==1" :class="{button_btn:list.length>0&&list[list.length-1].sh==0}" @click="doExamines">审核</button>
  
        <button :disabled="list.length==0||list[0].sh==0" :class="{button_btn:list.length>0&&list[list.length-1].sh==1}" @click="doExamineAgains">反审</button>
  
      </div>
  
    </div>
  
    <div class="set_box">
  
      <div class="set_info">
  
        <div class="firstForm">
  
          <ul class="clearfix">
  
            <li class="gui psn clearfix">
  
              <label>设计款号</label>
  
              <input type="text" placeholder="请选择(必填)" readonly :disabled="firstFormGui" v-model="firstForm.psn" @click="handlePsn">
  
              <button :class="{gui_btn:!firstFormGui}" :disabled="firstFormOn" @click="handlePsn">。。。</button>
  
            </li>
  
            <li class="gui">
  
              <label>物料档案编号</label>
  
              <input :disabled="firstFormNo" readonly placeholder="请选择(必选)" v-model="firstForm.materialSn" class="guiNum" type="text" @click="handleMaterial">
  
              <input :disabled="firstFormNo" readonly placeholder="请选择(必选)" v-model="firstForm.materialName" class="guiName" type="text" @click="handleMaterial">
  
              <button :class="{gui_btn:!firstFormOn}" :disabled="firstFormOn" @click="handleMaterial">。。。</button>
  
            </li>
  
            <li>
  
              <label>开发用量</label>
  
              <input type="text" v-model="firstForm.amount" :disabled="firstFormOn" placeholder="必填">
  
            </li>
  
            <li>
  
              <label>用量单位</label>
  
              <el-select :disabled="firstFormOn" v-model="firstForm.dosageUnit" placeholder="请选择(必选)">
  
                <el-option v-for="item in this.dosageUnit" :key="item.name" :label="item.name" :value="item.name">
  
                </el-option>
  
              </el-select>
  
            </li>
            <li>
  
              <label>生产损耗</label>
  
              <input type="text" v-model="firstForm.loss" :disabled="firstFormOn" placeholder="必填">%
  
            </li>
  
  
            <li>
  
              <label>成品编码</label>
  
              <input type="text" v-model="firstForm.productSn" :disabled="firstFormOn" placeholder="必填">
  
            </li>
  
            <li>
  
              <label>领用部门</label>
  
              <el-select :disabled="firstFormOn" v-model="firstForm.func" placeholder="请选择(必选)">
  
                <el-option v-for="item in this.oldFuncList" :key="item.name" :label="item.name" :value="item.name">
  
                </el-option>
  
              </el-select>
  
            </li>
  
            <li>
  
              <label>应用部位</label>
  
              <input type="text" v-model="firstForm.part" :disabled="firstFormOn" placeholder="必填">
  
            </li>
  
  
            <li>
  
              <label>性质</label>
  
              <el-select :disabled="firstFormOn" v-model="firstForm.nature" placeholder="请选择(必选)">
  
                <el-option v-for="item in this.natureList" :key="item.name" :label="item.name" :value="item.name">
  
                </el-option>
  
              </el-select>
  
            </li>
            <li>
  
              <label>大量货用量</label>
  
              <input type="text" v-model="firstForm.dosage" :disabled="firstFormOn" placeholder="">
  
            </li>
  
  
  
            <li class="explain clearfix">
  
              <label>说明</label>
  
              <input type="text" v-model="firstForm.explain" :disabled="firstFormOn" v-if="firstFormOn">
  
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="firstForm.explain" v-if="!firstFormOn"></el-input>
  
            </li>
  
  
  
            <button :disabled="firstFormOn" :class="{button_btn:!firstFormOn}" class="save" @click="firstSave">保存</button>
  
  
  
          </ul>
  
        </div>
  
  
  
        <div class="main clearfix">
  
          <div class="fl">
  
            <div class="order_table fl_table">
  
              <el-table :data="list" height="52vh" border style="width: 100%">
  
                <el-table-column prop="materialSn" label="物料编码" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="materialName" label="名称" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="kz" label="克重" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="size" label="布宽" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="dosageUnit" label="用量单位" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="dosage" label="用量" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="purchaseUnit" label="采购单位" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="func" label="领用部门" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="part" label="应用部位" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="explain" label="规格说明" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column prop="nature" label="性质" min-width="8.2%">
  
                </el-table-column>
  
                <el-table-column label="操作" min-width="9.8%">
  
                  <template slot-scope="scope">
  
                      <el-button
  
                        :disabled='(scope.row.sh==1)'
  
                        :class="{btn:(scope.row.sh==0)}"
  
                        type="text"
  
                        @click="handleEdit(scope.$index, scope.row)"
  
                      >修改</el-button>
  
                      <el-button
  
                        :disabled='(scope.row.sh==1)'
  
                        :class="{btn:(scope.row.sh==0)}"
  
                        type="text"
  
                        @click="tableDelete(scope.$index, scope.row)"
  
                      >删除</el-button>
</template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div class="fr">
            <ul class="clearfix titleColor">
              <li
                v-for="(item,i) in DesignColor"
                :key="i"
              >
                <P>{{item.colorSn}}-{{item.colorName}}</P>
                <span>编号名称</span>
                <span>操作</span>
              </li>
            </ul>
            <ul
              class="clearfix mainColor"
              v-for="(item,i) in list"
              :key="i"
            >
              <li
                v-for="(items,j) in item.attachment.color"
                :key="j"
              >
                <P>
                  <span>{{items.colorSn}}-{{items.color}}</span>
                  <span>
                    <el-button
                      type="text"
                      @click="addItem(item,items)"
                    >添加</el-button>
                    <el-button
                      type="text"
                      @click="deleteItem(items)"
                    >删除</el-button>
                  </span>
                </P>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="pageBox">
      <!-- <ul class="pageData">
                <li>
                    <span>编制人：</span>
                    <span>{{this.firstForm.addUser}}</span>
                </li>
                <li>
                    <span>编制日期：</span>
                    <span>{{this.firstForm.addDate}}</span>
                </li>
                <li>
                    <span>修改人：</span>
                    <span>{{this.firstForm.updateUser}}</span>
                </li>
                <li>
                    <span>修改日期：</span>
                    <span>{{this.firstForm.updateDate}}</span>
                </li>
                <li>
                    <span>审核人：</span>
                    <span>{{this.firstForm.shUser}}</span>
                </li>
                <li>
                    <span>审核日期：</span>
                    <span>{{this.firstForm.shDate}}</span>
                </li>

            </ul> -->
      <el-pagination
        v-if="pageOnOff"
        background
        :page-size="pageSize"
        :pager-count="5"
        :total="total"
        @current-change="currentPage"
      >
      </el-pagination>
    </div>

    <!-- 查询框 -->
    <!-- <el-dialog title="请输入您要查询的设计款号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="请输入您要查询的设计款号"></el-input>
            <ul class="srcond_menu">
                <p v-if="oldSearchList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldSearchList" :key="i" class="clearfix">
                    <span @click="getItemSearch(item)">{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>          -->
    <el-dialog
      title="请输入您要查询的设计款号"
      :visible.sync="oldPsn"
    >
      <el-input
        v-model="psn"
        placeholder="请输入您要查询的设计款号"
      ></el-input>
      <ul class="srcond_menu">
        <p v-if="oldPsnList.length===0">暂无数据</p>
        <li
          v-for="(item,i) in oldPsnList"
          :key="i"
          class="clearfix"
        >
          <span @click="getItemPsn(item)">{{item.pSn}}</span>
        </li>
      </ul>
    </el-dialog>

    <!-- 物料档案编号弹窗 -->
    <el-dialog
      title="请输入您要查询的物料名称"
      :visible.sync="oldMaterial"
    >
      <el-input
        v-model="material"
        placeholder="请输入您要查询的物料名称"
      ></el-input>
      <ul class="srcond_menu">
        <p v-if="oldMaterialList.length===0">暂无数据</p>
        <li
          v-for="(item,i) in oldMaterialList"
          :key="i"
          class="clearfix"
        >
          <span
            class="material"
            @click="getItemMaterial(item)"
          >{{item.sn}}</span>
          <span
            class="material"
            @click="getItemMaterial(item)"
          >{{item.name}}</span>
        </li>
      </ul>
    </el-dialog>

    <el-dialog
      title="请选择物料颜色"
      :visible.sync="oldMaterialColor"
    >
      <ul class="srcond_menu">
        <p v-if="materialColorList.length===0">暂无数据</p>
        <li
          v-for="(item,i) in materialColorList"
          :key="i"
          class="clearfix"
        >
          <span
            style="padding-left:0"
            class="material"
            @click="getmaterialColorItem(item)"
          >{{item.yscmSn}}-{{item.yscmName}}</span>
        </li>
      </ul>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="30%"
      class="edit"
    >
      <el-form
        :model="dialog"
        label-width="100px"
      >
        <el-form-item label="开发用量">
          <el-input
            v-model="dialog.amount"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="性质">
          <el-select
            v-model="dialog.nature"
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.natureList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成品编码">
          <el-input
            v-model="dialog.productSn"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="领用部门">
          <el-select
            v-model="dialog.func"
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.oldFuncList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用部位">
          <el-input
            v-model="dialog.part"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产损耗">
          <el-input
            v-model="dialog.loss"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="大量货用量">
          <el-input
            v-model="dialog.dosage"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="用量单位">
          <el-select
            v-model="dialog.dosageUnit"
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.dosageUnit"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <el-input
            v-model="dialog.explain"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveEdit"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 导入弹窗 -->
    <el-dialog
      class="importExport"
      title="导入"
      :visible.sync="importbox"
      width="30%"
      :showClose="false"
      :show-file-list="false"
    >
      <a
        class="down"
        href="/TPA/cMatBill/downExcel"
      >下载导入模板</a>
      <el-upload
        name="file"
        class="upload-demo"
        ref="upload"
        action=""
        :file-list="fileList"
        :http-request="uploadFile"
        :auto-upload="false"
        accept=".xls,.xlsx,.csv"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
          plain
        >选取文件</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >只能上传excel文件</div>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="importCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submitUpload"
          plain
        >确 定</el-button>
      </span>
    </el-dialog>
    <div
      class="importZhe"
      v-if="importZhe"
      v-loading="true"
      element-loading-text="正在上传中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
    <!-- 下载错误文件 -->
    <el-dialog
      title="错误提示"
      :visible.sync="tipOffON"
    >
      <ul class="srcond_menu">
        <li>
          <el-alert
            :title="Tips"
            type="error"
          ></el-alert>
          <span style="margin-top:5vh">是否下载错误提示文件</span>
        </li>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="tipOffON = importbox = false">取 消</el-button>
          <el-button
            type="primary"
            @click="importErr"
          >下载</el-button>
        </span>
      </ul>
    </el-dialog>

  </div>
</template>

<script>
  import "@/assets/js/import.js"; //导入请求超时拦截
  
  import {
  
    mapState
  
  } from "vuex";
  
  import {
  
    NetworkAnomaly,
  
    succ,
  
    error,
  
    getOut
  
  } from "../../../assets/js/message.js";
  
  import qs from "qs";
  
  export default {
  
    name: "wuliaoqingdan",
  
    data() {
  
      return {

          listColor:[],
  
        //按钮disabled
  
        doAdd: false,
  
        doCancel: true,
  
        doImport: false,
  
        doPrint: true,
  
        doSearch: true,
  
  
  
        search: "",
  
        oldSearch: false,
  
        oldSearchList: [],
  
        psn: "", //设计款号查询框
  
        oldPsn: false, //设计款号查询框开关
  
        oldPsnList: [], //设计款号查询框列表
  
  
  
        material: "",
  
        oldMaterial: false, //颜色查询框开关
  
        oldMaterialList: [], //颜色查询框列表
  
        oldFunc: false, //部门开关
  
        oldFuncList: [],
  
        dosageUnit: [], //用量单位
  
  
  
        DesignColor: [],
  
  
  
        firstFormNo: true,
  
        firstFormOn: true,
  
        firstFormGui: true,
  
  
  
        firstForm: {
  
          psn: "",
  
  
  
          sh: "-1", // 审核
  
          addUser: "",
  
          addDate: "",
  
          updateUser: "",
  
          updateDate: "",
  
          shUser: "",
  
          shDate: "",
  
  
  
          materialSn: "", //物料编号
  
          materialName: "", //物料名称
  
          amount: "", //开发用量
  
          nature: "", //性质编号
  
          productSn: "", //成品编号
  
          func: "", //领用部门名称
  
          part: "", //应用部位
  
          loss: "", //生产损耗
  
          dosage: "", //大量货用量
  
          dosageUnit: "",
  
          dosageUnitSn: "",
  
          explain: "" //说明
  
        },
  
  
  
        oldMaterialColor: false,
  
        materialItem: {}, //当前选择的物料
  
        materialColorItem: "", //选择的物料颜色
  
        materialColorList: [], //物料颜色列表
  
  
  
        materialColor: [], //所有的产品颜色
  
  
  
        natureList: [], //性质列表
  
        //表格数据
  
        list: [],
  
        printList: [],
  
  
  
        //导入弹出开关
  
        importbox: false,
  
        importZhe: false, //导入遮罩
  
        isCover: false, //默认导入不覆盖
  
        project: "", //错误文件名
  
        //上传的文件
  
        fileList: [],
  
        Tips: "", //错误提示
  
        tipOffON: false, //错误文件下载开关
  
  
  
        //编辑弹窗开关
  
        editVisible: false,
  
        idx: 0,
  
        //编辑弹出框数据
  
        dialog: {},
  
  
  
        //分页：当前页码/总数量/每页显示条数
  
        page: 0,
  
        total: "",
  
        pageSize: 10,
  
        pageOnOff: false,
  
        //分页排序查询条件
  
        pageParams: {},

        // 表头colorName数组
        tableTit: []
  
      };
  
    },
  
    methods: {
  
      //按钮初始状态
  
      emptyBtn() {
  
        this.doAdd = false;
  
        this.doCancel = true;
  
        this.doImport = false;
  
        this.doExport = false;
  
        this.doPrint = true;
  
      },
  
      //按钮按下状态
  
      emptyBtnTo() {
  
        this.doAdd = true;
  
        this.doCancel = false;
  
        this.doImport = true;
  
        this.doExport = true;
  
        this.doPrint = true;
  
      },
  
      //表单1恢复初始空值状态
  
      emptyFirstForm() {
  
        this.firstForm = {
  
          psn: "",
  
  
  
          sh: "-1", // 审核
  
          addUser: "",
  
          addDate: "",
  
          updateUser: "",
  
          updateDate: "",
  
          shUser: "",
  
          shDate: "",
  
  
  
          materialSn: "", //物料编号
  
          materialName: "", //物料名称
  
          amount: "", //开发用量
  
          nature: "", //性质编号
  
          productSn: "", //成品编号
  
          func: "", //领用部门名称
  
          part: "", //应用部位
  
          loss: "", //生产损耗
  
          dosage: "", //大量货用量
  
          dosageUnit: "",
  
          dosageUnitSn: "",
  
          explain: "" //说明
  
        };
  
      },
  
      //禁用表单first
  
      disabledFirstForm() {
  
        this.firstFormNo = true;
  
        this.firstFormOn = true;
  
        this.firstFormGui = true;
  
      },
  
      //开放表单first
  
      noDisabledFirstForm() {
  
        this.firstFormNo = false;
  
        this.firstFormOn = false;
  
        this.firstFormGui = false;
  
      },
  
  
  
      //新增
  
      doAdds() {
  
        this.search = "";
  
        this.doCancels();
  
        this.emptyBtnTo();
  
        this.noDisabledFirstForm();
  
  
  
        this.getFunc();
  
        this.getNatureList();
  
        this.getDosageUnit();
  
      },
  
      //取消
  
      doCancels() {
  
        this.emptyBtn();
  
        this.emptyFirstForm();
  
        this.disabledFirstForm();
  
        this.pageOnOff = false;
  
  
  
        this.pSn = "";
  
        // this.search = "";
  
        this.oldSearchList = [];
  
  
  
        this.list = [];
  
        this.natureList = [];
  
        this.chanpinColor = [];
  
        this.oldFuncList = [];
  
        this.oldMaterialList = [];
  
        this.fileList = [];
  
        this.dosageUnit = [];
  
        this.DesignColor = [];
  
  
  
        this.oldMaterialColor = false;
  
        this.materialItem = {}; //当前选择的物料
  
        this.materialColorItem = ""; //选择的物料颜色
  
        this.materialColorList = []; //物料颜色列表
  
      },
  
      //first保存
  
      firstSave() {
  
        for (let i in this.dosageUnit) {
  
          if (this.firstForm.dosageUnit === this.dosageUnit[i].name) {
  
            this.firstForm.dosageUnitSn = this.dosageUnit[i].sn;
  
          }
  
        }
  
        let term = !this.firstForm.psn ||
  
          !this.firstForm.materialSn ||
  
          !this.firstForm.materialName ||
  
          !this.firstForm.amount ||
  
          !this.firstForm.nature ||
  
          !this.firstForm.productSn ||
  
          !this.firstForm.func ||
  
          !this.firstForm.part ||

          !this.firstForm.loss.toString() ||
  
          !this.firstForm.dosage ||
  
          !this.firstForm.dosageUnit ||
  
          !this.firstForm.dosageUnitSn ||
  
          !this.firstForm.dosage;
  
  
  
        if (!term) {
  
          console.log(this.firstForm);
  
          this.$http
  
            .post("/TPA/cMatBill/insert", qs.stringify(this.firstForm))
  
            .then(res => {
  
              if (res.data.code === 0) {
  
                succ(res.data.msg);
  
                this.pageOnOff = false;
  
                let params = {
  
                  psn: this.firstForm.psn,
  
                  count: this.pageSize,
  
                  page: 0
  
                };
  
                this.pageParams = params;
  
                this.getPageData(this.pageParams);
  
                this.getDesignColor(this.firstForm.psn);
  
  
  
                let psn = this.firstForm.psn;
  
                this.emptyFirstForm();
  
                this.firstFormGui = true;
  
                this.firstForm.psn = psn;
  
                console.log(this.firstFormGui);
  
              } else {
  
                error(res.data.msg);
  
              }
  
            })
  
            .catch(err => {
  
              NetworkAnomaly();
  
            });
  
        } else {
  
          error("请完善表单必填项");
  
        }
  
      },
  
  
  
      //查询
  
      doSearchs() {
  
        // this.oldSearch = true
  
        this.doCancels();
  
        this.doCancel = false;
  
  
  
        let params = {
  
          psn: this.search,
  
          count: this.pageSize,
  
          page: 0
  
        };
  
        this.pageParams = params;
  
        this.getDesignColor(this.search);
        // this.getPageData(this.pageParams);
  
  
  
        
  
      },
  
      //点击设计款号
  
      handlePsn() {
  
        this.oldPsn = true;
  
        this.noDisabledFirstForm();
  
        this.psn = "";
  
      },
  
      //点击物料编号
  
      handleMaterial() {
  
        this.oldMaterial = true;
  
        this.noDisabledFirstForm();
  
        this.material = "";
  
      },
  
      //退出
  
      doOuts() {
  
        this.$emit("getOut", this.$route.name);
  
      },


  
      //打印
  
      doPrints() {
  
        this.$http
  
          .post("/TPA/cMatBill/search?psn=" + this.list[0].psn)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              this.printList = res.data.data.list;
  
              localStorage.setItem("printList", JSON.stringify(this.printList));
  
              localStorage.setItem(
  
                "DesignColor",
  
                JSON.stringify(this.DesignColor)
  
              );
  
  
  
              // window.open("/#/mianliaoyudingjihuaPrint");
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
        // localStorage.setItem("pageTit", JSON.stringify(this.firstForm));
  
  
  
        window.open("/erp/#/wuliaoqingdanPrint");
  
        this.printList = [];
  
      },
  
  
  
      //审核
  
      doExamines() {
  
        this.$http
  
          .post("/TPA/cMatBill/auditing?status=1&psn=" + this.list[0].psn)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              succ(res.data.msg);
  
              this.getPageData(this.pageParams);
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
      //反审
  
      doExamineAgains() {
  
        this.$http
  
          .post("/TPA/cMatBill/auditing?status=0&psn=" + this.list[0].psn)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              succ(res.data.msg);
  
              this.getPageData(this.pageParams);
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
  
  
      //导入按纽
  
      doImports() {
  
        this.importbox = true;
  
      },
  
      //导入取消
  
      importCancel() {
  
        this.emptyBtn();
  
        this.importbox = false;
  
        this.$refs.upload.clearFiles();
  
      },
  
      //文件上传到服务器按钮
  
      submitUpload() {
  
        this.$refs.upload.submit();
  
      },
  
      //自定义上传
  
      uploadFile(params) {
  
        this.importZhe = true;
  
        const _file = params.file;
  
        let formData = new FormData();
  
        formData.append("file", _file);
  
        this.$ajax
  
          .post("/TPA/cMatBill/importExcel", formData)
  
          .then(res => {
  
            console.log(res);
  
            if (res.status === 200) {
  
              if (res.data.code === 0) {
  
                succ(res.data.msg);
  
                this.importCancel();
  
                this.$refs.upload.clearFiles();
  
              } else if (res.data.code === 100) {
  
                this.tipOffON = true;
  
                this.project = res.data.attachment.name;
  
                this.Tips = res.data.msg;
  
              } else {
  
                error(res.data.msg);
  
              }
  
            } else {
  
              NetworkAnomaly();
  
            }
  
            this.importZhe = false;
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
            this.importZhe = false;
  
          });
  
      },
  
      //下载错误文件按钮
  
      importErr() {
  
        let errUrl = "/TPA/aImportExcel/exportMsg?name=" + this.project;
  
        // console.log(errUrl)
  
        window.location.href = errUrl;
  
        setTimeout(() => {
  
          this.tipOffON = false;
  
          this.importCancel();
  
        }, 500);
  
      },
  
      //导出
  
      doExports() {
  
        window.location.href = "/TPA/cMatBill/exportExcel";
  
      },
  
  
  
      //点击物料颜色添加按钮
  
      addItem(item, items) {
  
        // console.log(item)
  
        this.materialItem = item;
  
        this.materialItem.psnColor = items.psnColor;
  
        this.materialItem.psnColorSn = items.psnColorSn;
  
        this.getmaterialColorList(item.materialSn);
  
        this.oldMaterialColor = true;
  
      },
  
      //删除物料颜色
  
      deleteItem(item) {
  
        console.log(item);
  
        this.$http
  
          .post("/TPA/cMatBillA/delete?id=" + item.id)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              succ(res.data.msg);
  
              let params = {
  
                psn: item.psn,
  
                count: this.pageSize,
  
                page: 0
  
              };
  
              this.pageParams = params;
  
              this.getPageData(this.pageParams);
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
  
  
      //获取物料颜色列表
  
      getmaterialColorList(sn) {
  
        this.$http
  
          .post("/TPA/cMatBillA/getBySn?sn=" + sn)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              this.materialColorList = res.data.data;
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
  
  
      //编辑单条数据
  
      handleEdit(index, row) {
  
        this.getFunc();
  
        this.getNatureList();
  
        this.getDosageUnit();
  
        this.idx = index;
  
        const item = this.list[index];
  
  
  
        (this.dialog = {
  
          id: item.id, //id
  
          sn: item.sn,
  
          amount: item.amount,
  
          nature: item.nature,
  
          productSn: item.productSn,
  
          func: item.func,
  
          part: item.part,
  
          loss: item.loss,
  
          dosage: item.dosage,
  
          dosageUnit: item.dosageUnit,
  
          dosageUnitSn: item.dosageUnitSn,
  
          explain: item.explain
  
        }),
  
        (this.editVisible = true);
  
      },
  
      // 保存编辑
  
      saveEdit() {
  
        for (let i in this.dosageUnit) {
  
          if (this.dialog.dosageUnit === this.dosageUnit[i].name) {
  
            this.dialog.dosageUnitSn = this.dosageUnit[i].sn;
  
          }
  
        }
  
        let term = !this.dialog.amount ||
  
          !this.dialog.nature ||
  
          !this.dialog.productSn ||
  
          !this.dialog.func ||
  
          !this.dialog.part ||
  
          !this.dialog.loss ||
  
          !this.dialog.dosage ||
  
          !this.dialog.dosageUnit ||
  
          !this.dialog.dosageUnitSn ||
  
          !this.dialog.explain;
  
  
  
        if (!term) {
  
          this.$http
  
            .post("/TPA/cMatBill/update", qs.stringify(this.dialog))
  
            .then(res => {
  
              console.log(res);
  
              if (res.data.code === 0) {
  
                this.$set(this.list, this.idx, this.dialog);
  
                this.editVisible = false;
  
                succ(res.data.msg);
  
                this.getPageData(this.pageParams);
  
              } else {
  
                error(res.data.msg);
  
              }
  
            })
  
            .catch(err => {
  
              NetworkAnomaly();
  
            });
  
        } else {
  
          error("请完善表单必填项");
  
        }
  
      },
  
      //删除表格的单条数据
  
      tableDelete(index, row) {
  
        this.idx = index;
  
        const item = this.list[index];
  
        this.$http
  
          .post("/TPA/cMatBill/delete?id=" + item.id)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              succ(res.data.msg);
  
              this.getPageData(this.pageParams);
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
  
  
      //获取生产职能（领用部门）
  
      getFunc() {
  
        this.$http
  
          .post("/TPA/aLbJb/getBySn?sn=026")
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              this.oldFuncList = res.data.data;
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
      //获取性质
  
      getNatureList() {
  
        this.$http
  
          .post("/TPA/aLbJb/getBySn?sn=025")
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              this.natureList = res.data.data;
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
      //获取用量单位
  
      getDosageUnit() {
  
        this.$http
  
          .post("/TPA/aLbJb/getBySn?sn=006")
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              this.dosageUnit = res.data.data;
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
  
  
      //查询当前设计款号下的所有产品颜色
  
      getDesignColor(psn) {
  
        this.$http
  
          .post("/TPA/cMatBillA/getBy?psn=" + psn)
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              this.DesignColor = res.data.data;

              // 循环表头拿到colorName
              for(var i = 0; i < this.DesignColor.length; i++) {
                  this.tableTit.push(this.DesignColor[i].colorName)
              }
  
              // 获取到表头后再调用分页  
              this.getPageData(this.pageParams);
  
              for (let i = 0; i < this.list.length; i++) {
  
                this.$http
  
                  .post("/TPA/cMatBill/getBySn?sn=" + this.list[i].sn)
  
                  .then(res => {
  
                    if (res.data.code === 0) {
  
                      this.materialColor = res.data.data;



  
                    } else {
  
                      error(res.data.msg);
  
                    }
  
                  })
  
                  .catch(err => {});
  
              }
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => [NetworkAnomaly()]);
  
      },
  
  
  
      //选择查询的设计编号
  
      // getItemSearch(item) {
  
      //   this.firstForm.psn = this.search;
  
      //   this.doCancels();
  
      //   this.emptyBtnTo();
  
  
  
      //   this.firstForm = item;
  
  
  
      //   this.oldSearch = false;
  
      //   this.search = "";

  
      //   this.getDesignColor(this.firstForm.psn);
  
      // },
  
      //选择设计编号
  
      getItemPsn(item) {
  
        this.firstForm.psn = item.pSn;
  
        this.firstForm.sh = item.sh;
  
        this.emptyBtnTo();
  
        this.oldPsn = false;

        let params = {
  
          psn: item.pSn,
  
          count: this.pageSize,
  
          page: 0
  
        };
  
        this.pageParams = params;
  
        this.getPageData(this.pageParams);

        

        this.psn = "";
        this.search = item.pSn;
  
      },
  
      //选择物料
  
      getItemMaterial(item) {
        console.log(item)
  
        this.firstForm.materialSn = item.sn;
  
        this.firstForm.materialName = item.name;
  
        this.firstForm.loss = item.loss;

        this.oldMaterial = false;
  
        this.material = "";
  
      },
  
      //选择物料颜色
  
      getmaterialColorItem(item) {
  
        let form = this.materialItem;
  
        form.color = item.yscmName;
  
        form.colorSn = item.yscmSn;
  
        form.masterSn = form.sn;
  
        this.oldMaterialColor = false;
  
        // console.log(form)
  
        this.$http
  
          .post("/TPA/cMatBillA/insert", qs.stringify(form))
  
          .then(res => {
  
            if (res.data.code === 0) {
  
              succ(res.data.msg);
  
              let params = {
  
                psn: form.psn,
  
                count: this.pageSize,
  
                page: 0
  
              };
  
              this.pageParams = params;
  
              this.getPageData(this.pageParams);
  
            } else {
  
              error(res.data.msg);
  
            }
  
          })
  
          .catch(err => {
  
            NetworkAnomaly();
  
          });
  
      },
  
      //选择生产只能（领用部门）
  
      getItemFunc(item) {
  
        this.firstForm.func = item.name;
  
        this.oldFunc = false;
  
      },
  
      //分页
  
      getPageData(params) {

        this.list = [];

            // this.getDesignColor(params.psn);
            this.$http.post("/TPA/cMatBill/search", qs.stringify(params))
                .then(res => {
    
                if (res.data.code === 0) {
    
                this.doPrint = false;
    
                let list = res.data.data.list;        
                
                // 循环表格数据
                for (var i = 0; i < list.length; i++) {
                    // 声明变量装重新排序的每一个list
                    let Arr = [];
                     
                    for (var j = 0; j < this.tableTit.length; j++) {

                        for (var k = 0; k < list[i].attachment.color.length; k++) {
                            
                            
                            // 循环每一个this.list[i].attachment.color，拿每一个表头按顺序进行对比，如果相同
                            if(this.tableTit[j] == list[i].attachment.color[k].psnColor) {
                                Arr.push(list[i].attachment.color[k]);
                            }
                        }
                    }
           
                    if(Arr.length<list[i].attachment.color.length){
                        list[i].attachment.color = Arr;
                    }else{
                        Arr = []
                    }
                    
                    
                }
                
                this.list = list;
                

                this.total = res.data.data.total;
    
                if (this.total > this.pageSize) {
    
                    this.pageOnOff = true;
    
                } else {
    
                    this.pageOnOff = false;
    
                }
    
                } else {
    
                error(res.data.msg);
    
                }
    
            })
            .catch(err => {
    
                NetworkAnomaly();
    
            });       
            
            // console.log(this.DesignColor, this.materialColor)
        
  

  

  
      },
  
      //获取当前页码
  
      currentPage(val) {
  
        this.page = val;
  
      }
  
    },
  
    computed: {
  
      ...mapState(["collapse"])
  
    },
  
    watch: {
  
      page() {
  
        this.pageParams.page = this.page - 1;
  
        this.getPageData(this.pageParams);
  
      },
  
      //获取设计编号
  
      psn() {
  
        if (this.psn) {
  
          let search = {
  
            pSn: 17 + "|" + this.psn
  
          };
  
          let searchStr = JSON.stringify(search);
  
          this.$http
  
            .post("/TPA/cSpda/search?sp=1&search=" + searchStr)
  
            .then(res => {
  
              if (res.data.code === 0) {
  
                this.oldPsnList = res.data.data.list;
  
              } else {
  
                error(res.data.msg);
  
              }
  
            })
  
            .catch(err => {
  
              NetworkAnomaly();
  
            });
  
        } else {
  
          this.oldPsnList = [];
  
        }
  
        this.doAdd = false;
  
      },
  
      search() {
  
        if (this.search) {
  
          this.doSearch = false;
  
        } else {
  
          this.doSearch = true;
  
        }
  
      },
  
      //获取查询设计编号
  
      // search(){
  
      //     if(this.search){
  
      //         this.$http
  
      //             .post("/TPA/cMatBill/getByPsn2?psn=" + this.search)
  
      //             .then(res => {
  
      //                if(res.data.code===0){
  
      //                    this.oldSearchList = res.data.data
  
      //                    console.log(res)
  
      //                }else{
  
      //                    error(res.data.msg)
  
      //                }
  
      //             })
  
      //             .catch(err => {
  
      //                 NetworkAnomaly();
  
      //             });
  
      //     }else{
  
      //         this.oldPsnList = []
  
      //     }
  
      //     this.doAdd = false
  
      // },
  
      //获取物料
  
      material() {
  
        if (this.material) {
  
          // let search = {
  
          //   name: 17 + "|" + this.material
  
          // };
  
          // let searchStr = JSON.stringify(search);
  
          this.$http
  
            .post("/TPA/cWlda/getByName?name=" + this.material)
  
            .then(res => {
              console.log(res)
  
              if (res.data.code === 0) {
  
                // this.oldMaterialList = res.data.data.list;
                this.oldMaterialList = res.data.data;
  
              } else {
  
                error(res.data.msg);
  
              }
  
            })
  
            .catch(err => {
  
              NetworkAnomaly();
  
            });
  
        } else {
  
          this.oldMaterialList = [];
  
        }
  
      }
  
    }
  
  };
</script>

<style lang="stylus" scoped>
@import './css/style.styl'
.container>>>.el-textarea__inner
  height 3.5vh !important
  min-height 3.5vh !important
// table
.container>>>.el-checkbox__label
  padding-left 0 !important
.container>>>th, .order_table>>>.el-table td, .el-table th
  padding 0
  font-szie 1vh
.container>>>.el-table .cell
  line-height 3.5vh
  text-align center
  font-size 12px
  word-break normal
  // white-space pre-wrap
  padding 0 5px
.container>>>.fl_table .el-table th .cell
  line-height 8vh
  text-align center
  word-break normal
  font-size 12px
  white-space pre-wrap
.container>>>.el-dialog
  width 400px
  height 400px
  overflow-x hidden
.container>>>.edit .el-dialog
  width 500px
  height 750px
  overflow-x hidden
.container>>>.el-dialog .el-select
  width 100%
// 下拉框
.firstForm>>>.el-input--suffix .el-input__inner
  width 100% !important
.firstForm>>>.el-input--suffix, .firstForm>>>.el-input__inner
  height 3.5vh !important
.firstForm>>>.el-input__icon
  line-height 3.5vh
.container>>>.el-dialog
  width 500px
  height 500px
.srcond_menu
  li
    &:hover
      background #d2d2d2
    span
      padding-left 2vh
      line-height 3vh
      &.material
        width 50%
        float left
        padding-left 10%
.order_table
  width 180px
  height 43.8vh
  span
    width 50%
    line-height 4vh
    height 4vh
    text-align center
    border 1px solid #ebeef5
    border-left none
    display block
    float left
  ol
    li
      width 50%
      line-height 4vh
      height 4vh
      text-align center
      border 1px solid #ebeef5
      border-left none
  button
    display block
    padding 0.4vh 1vh
    margin 0.7vh 2vh
    float left
    border 1px solid #d2d2d2
    font-size 1.4vh
    &.btn
      border 1px solid #409EFF
      color #409EFF
</style>

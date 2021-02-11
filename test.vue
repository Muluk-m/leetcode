<template>
  <!----------------修改查询条件子组件，父组件QueryDetail---------------->
  <div id="ModifyQuery">
    <div class="mainContainer">
      <!---------------查询名称---------------->
      <div style="display: flex;align-items: center;margin-bottom: 10px;">
        名称:<el-input v-model="name"></el-input>
      </div>
      <!---------左边分析数据源+字段--------------->
       <div class="leftDIV">
         <!-- 分析数据源  -->
           <!-- <p class="pTitle">分析数据源</p > -->
          <!-- <ul class="dataSourceUL">
            <li v-for="(dataSource, index) in dataSources" :key="index"  @click="selectDataSource(dataSource)">
              <div class="dataNameDIV">
                <p>{{dataSource.name}}</p >
                <img v-show="dataSource.checkedFlag" class="radioImg" src="../../assets/img/radio-checked-black.png" alt="">
                <img v-show="!dataSource.checkedFlag" class="radioImg" src="../../assets/img/radio-unchecked-black.png" alt="">
              </div>
            </li>
          </ul> -->
    <el-select v-model="dataFieldValue" placeholder="分析数据源"  @change="selectDataSource()">
    <el-option
      v-for="dataSource in dataSources"
      :key="dataSource.id"
      :value="dataSource.name"
     >
      <!-- <span style="float: left">{{dataSource.name}}</span> -->
    </el-option>
  </el-select>
        <!-- 字段 -->
        <div class="fieldDIV">
          <p class="pTitle">字段</p >
          <ul class="dataFieldUL" style="height: 361px;">
            <li v-for="(dataField, index) in dataFields" :key="index"  @click="selectDataField(dataField)"
                :style="dataField.checkedFlag ? 'background:#efefef;border-top:1px solid #cecece;border-bottom:1px solid #cecece' : 'background:none'">
              <div class="fieldNameDIV">
                <p class="fieldNameP">{{dataField.displayName}}</p >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!----------右边选择的查询条件--------------->
      <div class="rightDIV">
        <div class="rightInner">
          <div class="buttons">
        <!---------------底部按钮---------------->
      <div class="operationButtons">
        <el-button @click="goBack()">返回</el-button>
        <el-button type="primary" @click="saveBackQuery()">保存&返回</el-button>
        <el-button type="primary" @click="saveQuery()">保存&查询</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import FilterOfQuery from './FilterOfQuery' // 筛选器子组件
import DimensionOfQuery from './DimensionOfQuery' // 分类维度子组件
import StatisticOfQuery from './StatisticOfQuery' // 统计字段子组件
export default {
  name: 'ModifyQuery',
  components: {
    FilterOfQuery,
    DimensionOfQuery,
    StatisticOfQuery
  },
  props: ['queryId'], // 当前路由的id details后面的id
  data () {
    return {
      dataId: '',
      dataFieldValue: '',
      radio: '1',
      queryConfigModifyFlag: 0,
      name: '', // 查询名称
      dataSources: [], // 分析数据源
      checkedDataSetId: 1, // 被选中的数据源id
      dataFields: [], // 字段
      filterList: [], // 筛选器列表选中的字段
      dimensionList: [], // 分类维度列表选中的字段
      statisticList: [], // 统计字段列表选中的字段
      checkedField: [], // 选中的字段
      allAggregateFunctions: this.$store.state.aggregateFunctions.aggregateFunctions, // 聚合函数
      allDimensionFunctions: this.$store.state.dimensionFunctions.dimensionFunctions, // 维度函数
      modifyId: '', // 修改的id
      filterModifyList: [], // 修改后 筛选器列表
      dimensionModifyList: [], // 修改后 维度列表
      statisticModifyList: [], // 修改后 统计字段列表
      isModifyConfig: false
    }
  },
  mounted () {
    this.modifyId = this.queryId
    // console.log('vuex里的方法：', this.$store.state.aggregateFunctions.aggregateFunctions)
    this.getDataSource() // 获取数据源
    // 获取数据源对应的字段
    // this.getDataField(1)
    this.$nextTick(() => {
      this.getQueryDetails()
    })

  },
  watch: {

    queryId (newVal, oldVal) {
      this.queryId = newVal
      this.modifyId = this.queryId // 修改的id 为当前路由详情的id
    },
    filterList (newVal, oldVal) {
      this.watchModifyConfig(newVal, this.filterModifyList)
    },
    dimensionList (newVal, oldVal) {
      this.watchModifyConfig(newVal, this.dime

  
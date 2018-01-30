	
	//警情趋势分析

		
	$("#asjqs_page1").load("html/qsfx/jq.html",function(){console.log(777)
		function jq(){
				$(document).ready(function(){
			  		$(".b_search").click(function(){//搜索栏隐藏
			  			//console.log(555)
			  			$(".search").toggle(500);
			  		});
				});
				//时间选择
				$('.date_picker').date_input();
				
				var jxqy =  $("#jxqy");

				var policestationjj = $('#policestationjj');
				var policestationcj = $('#policestationcj');
				var policestationfk = $('#policestationfk');
				//console.log(policestationfk);
				var deptCode;

				//promise一下
				var promise = new Promise(function(resolve,reject){

					$.ajax({
					    type:'GET',
					    url:'api/dimDicGb/getByDmbh?dmbh=3607',

					    success:function(data){
					       // console.log(JSON.parse(data));
					        var data = JSON.parse(data);
					        var template = `<option value="">区域</option>`;
					        data.forEach(function(item,index){
					        	//console.log(item.dmmc);
					        	template += `
					        		<option value="${item.dmbh}" data-dmbh="${item.dmbh}">${item.dmmc}</option>
					        	`;
					        });
					        //console.log(template);
					        jxqy.html(template);

					        //地区编码
							deptCode = jxqy.children()[0].dataset.dmbh;
							//console.log(deptCode);
							
							
							
									
							resolve(deptCode)
					    }

					})
				})

				//接警
				promise.then(function(deptCode){
					//console.log(deptCode);
					//当上级select框改变时重新请求数据
					jxqy.change(function(){
								deptCode=jxqy.val();
								console.log(jxqy.val())
								getdata(deptCode);
					});
					getdata(deptCode);			
				})

				//接警数据请求
				function getdata(deptCode){
					$.ajax({
					    type:'GET',
					    url:'api/dimCodeAjxxDept/getByDeptCode?deptCode='+deptCode,
					    //data:{}
					    scriptCharset:'utf-8',

					    success:function(data){
					    	//console.log(data);
					       //console.log(JSON.parse(data));
					        var data = JSON.parse(data);
					        var templatejj =`<option value="">接警单位<option>`;
					        var templatecj =`<option value="">出警单位<option>` ;
					        var templatefk =`<option value="">反馈单位<option>` ;

					        data.forEach(function(item,index){
					        	//console.log(item.deptName);
					        	var thisstr = item.deptName;
					        	if(item.deptName.length>10){
					        		thisstr = item.deptName.slice(0,11) + "...";
					        	}
					        	//item.deptName;
					        	templatejj += `
					        		<option title="${item.deptName}" value="${item.deptCode}" data-id="${item.id}">${thisstr}</option>
					        	`;
					        	templatecj += `
					        		<option title="${item.deptName}" value="${item.deptCode}" data-id="${item.id}">${thisstr}</option>
					        	`;
					        	templatefk += `
					        		<option title="${item.deptName}" value="${item.deptCode}" data-id="${item.id}">${thisstr}</option>
					        	`;
					        });
					        policestationjj.html(templatejj);
					        policestationjj.find('option')[1].remove();
					        policestationcj.html(templatecj);
					        policestationcj.find('option')[1].remove();
					        policestationfk.html(templatefk);
					        policestationfk.find('option')[1].remove();

					  //       var thisStr = $("#policestationjj option").html();
							// console.log(thisStr.length);
							// if(thisStr.length>10){
							// 	$("#policestationjj option").html(thisStr.slice(0,11)) ;
							// }
							// console.log($("#policestationjj option").html());
					    }
					})
				}

				//默认当前时间
				
				var date = new Date();
				var year = date.getFullYear();
				var month = (date.getMonth()+1);
				var ri = date.getDate();

				//补零
				if(Number(month)<10){
					month = "0" + month;
				}
				if(Number(ri)<10){
					ri = "0" + ri;
				}

				var dateString = year + "-" + month + "-" + ri;

				//input框初始化
				$("#datejq").val(dateString);
				var dateStringify = year +month + ri;
				// $('.date').val(dateString);
				//console.log(dateString)
				//$(".thisdate").text(dateString)
				var selectdate = dateString;
				var startyear = "18";
				
				//统计项目
				var projecttotal = $('#projecttotal');
				var tenyearsdata = [];
				

				//初始化界面
				
				var initdata = {
						    	date:dateStringify,
						    	field:projecttotal.val(),//接警数量
						    	xzqhbh:jxqy.val(),//地区
						    	jjdwbh:policestationjj.val(),//j接警单位
						    	fkdwbh:policestationcj.val(),//反馈
						    	cjdwbh:policestationfk.val()//出警
				};
				var datahours ={
					date:dateStringify,
				    field:projecttotal.val(),
				    jjdwbh:policestationjj.val(),//j接警单位
					fkdwbh:policestationcj.val(),//反馈
					cjdwbh:policestationfk.val()//出警

				};
				var datamonth = {
					date:dateStringify,
				    field:projecttotal.val(),
				    jjdwbh:policestationjj.val(),//j接警单位
					fkdwbh:policestationcj.val(),//反馈
					cjdwbh:policestationfk.val()//出警
				};	
				var dataday ={
					date:dateStringify,
					field:projecttotal.val(),
					jjdwbh:policestationjj.val(),//j接警单位
					fkdwbh:policestationcj.val(),//反馈
					cjdwbh:policestationfk.val()//出警
				}

				calc(initdata,datahours,datamonth,dataday);
				$(".thisdate").text(dateString);

			
					console.log($("#jxqy").val());
				$("#calc").click(function(){
				
					//获取当前年份
					//var date = $('.date').val();
					var date = $("#datejq").val();
					//console.log(date)
					//处理年月日
					var date = date.replace(/-/g,"");
					var year = date.slice(0,4);
					var month = date.slice(4,6);
					var days = date.slice(6,8);
					if(Number(days)<10){
						days = "0"+days;
						date = year + month + days;
					}
					if(date=="0")
						return
					//console.log(year,month,days);
					
					var cns = {
								date:date,
						    	field:projecttotal.val(),//接警数量
						    	xzqhbh:jxqy.val(),//地区
						    	jjdwbh:policestationjj.val(),//j接警单位
						    	fkdwbh:policestationcj.val(),//反馈
						    	cjdwbh:policestationfk.val()//出警
					};
					var datahours = {
						date:date,
				    	field:projecttotal.val(),
					};
					var datamonth = {
						date:date,
					    field:projecttotal.val()
					};
					var dataday = {
						date:date,
					    field:projecttotal.val()
					};		
					calc(cns,datahours,datamonth,dataday);
					//更新时间
			    	$(".thisdate").text(year + "-" + month + "-" + days);
				})
			

			

				function r_qs_fun(thisData,lastData){
					
					// var lastData = [137,90,114,67,87,123,146,171,160,199,66,127,172,66,133,104,196,105,57,79,93,160,59,108];
					// var thisData = [66,145,187,41,101,176,181,178,116,82,82,179,167,101,87,87,89,119,40,79,89,73,189,199];
					var tbData = [];
					var hbData = [];
					console.log(thisData,lastData);
					var category = [];
					var maxCategory = 24;        
					for (var i = 0; i <maxCategory; i++) {
					    var this_i= i+1;
					    category.push(this_i+'时');
					    tbData[i] = (((thisData[i]-lastData[i])/lastData[i])*100).toFixed(2);
					    if(i < 1){
					    	hbData[i]=(((thisData[i]-lastData[maxCategory-1])/lastData[maxCategory-1])*100).toFixed(2);
					    }else{
					    	hbData[i]=(((thisData[i]-thisData[i-1])/thisData[i-1])*100).toFixed(2);
					    };
					}
					console.log(tbData,hbData);
					
					option = {
					    title: {text: "一日趋势分析",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
					  
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {type: 'shadow',label: {show: true} }
					    },
					    legend: {
					        data: ['上一期','本期', '同比增长','环比增长'],
					        textStyle: {color: '#B4B4B4',fontSize: 12,},
					        top:'7%',
					    },
					    grid:{x:'5%',width:'90%',y:'15%'},
					    xAxis: {
					        data: category,
					        axisLine: {lineStyle: {color: '#B4B4B4'}},
					        axisTick:{show:true,},
					        axisLabel:{interval: 0,},
					    },
					    yAxis: [{
					    	  name:'数量',
					    		nameLocation:'end',
					        splitLine: {show: false},
					        axisLine: {lineStyle: {color: '#B4B4B4',}},
					        axisLabel:{formatter:'{value}',}       
					    },{
					    	  name:'增长率',
					    		nameLocation:'end',
					        splitLine: {show: false},
					        axisLine: { lineStyle: {color: '#B4B4B4',}},
					        axisLabel:{formatter:'{value}',}
					    }],
					    series: [{
					        name: '上一期',
					        type: 'bar',  
					        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
					        itemStyle: {
					            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}])}
					        },
					        data: lastData,
					    },{
					        name: '本期',
					        type: 'bar',  
					        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
					        itemStyle: {
					            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}])}
					        },
					        data: thisData,
					    },{
					        name: '同比增长',
					        type: 'line',
					        smooth: true,
					        showAllSymbol: true,
					        symbol: 'emptyCircle',
					        symbolSize: 8,
					        yAxisIndex: 1,
					        itemStyle: {normal: {color:"rgba(0,185,96,.85)"},},
					        data: tbData,
					    }, {
					        name: '环比增长',
					        type: 'line',
					        smooth: true,
					        showAllSymbol: true,
					        symbol: 'emptyCircle',
					        symbolSize: 8,
					        yAxisIndex: 1,
					        itemStyle: {normal: {color:"rgba(113,129,248,.85)"},},
					        data: hbData,
					    },
					   ]
					};
					var Chart = echarts.init(document.getElementById('r_qs'));
					Chart.setOption(option);	
				}


				function y_qs_fun(thisData,lastData){
					// console.log(thisData,lastData);
					//var lastData = [197,181,6,183,142,35,195,130,152,124,84,159,189,34,105,38,34,13,31,10,127,118,160,185,16,149,1,79,187,184,190];
					//var thisData = [80,117,139,176,41,56,24,186,10,36,48,1,155,166,33,64,110,124,46,148,81,126,146,142,50,117,78,181,41,187,42];
					var tbData = [];
					var hbData = [];
					var category = [];
					var maxCategory = 31;        
					for (var i = 0; i < maxCategory; i++) {
					    var this_i= i+1;
					    category.push(this_i+'日');
					    tbData[i] = (((thisData[i]-lastData[i])/lastData[i])*100).toFixed(2);
					    if(i < 1){
					    	hbData[i]=(((thisData[i]-lastData[maxCategory-1])/lastData[maxCategory-1])*100).toFixed(2);
					    }else{
					    	hbData[i]=(((thisData[i]-thisData[i-1])/thisData[i-1])*100).toFixed(2);
					    };
					}
					console.log(tbData,hbData);
					option = {
					    title: {text: "一月趋势分析",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
					    
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {type: 'shadow',label: {show: true} }
					    },
					    legend: {
					        data: ['上一期','本期', '同比增长','环比增长'],
					        textStyle: {color: '#B4B4B4',fontSize: 12,},
					        top:'7%',
					    },
					    grid:{x:'5%',width:'90%',y:'15%'},
					    xAxis: {
					        data: category,
					        axisLine: {lineStyle: {color: '#B4B4B4'}},
					        axisTick:{show:true,},
					        axisLabel:{interval: 0,},
					    },
					    yAxis: [{
					    	  name:'数量',
					    		nameLocation:'end',
					        splitLine: {show: false},
					        axisLine: {lineStyle: {color: '#B4B4B4',}},
					        axisLabel:{formatter:'{value}',}       
					    },{
					    	  name:'增长率',
					    		nameLocation:'end',
					        splitLine: {show: false},
					        axisLine: { lineStyle: {color: '#B4B4B4',}},
					        axisLabel:{formatter:'{value}',}
					    }],
					    series: [{
					        name: '上一期',
					        type: 'bar',  
					        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
					        itemStyle: {
					            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}])}
					        },
					        data: lastData,
					    },{
					        name: '本期',
					        type: 'bar',  
					        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
					        itemStyle: {
					            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}])}
					        },
					        data: thisData,
					    },{
					        name: '同比增长',
					        type: 'line',
					        smooth: true,
					        showAllSymbol: true,
					        symbol: 'emptyCircle',
					        symbolSize: 8,
					        yAxisIndex: 1,
					        itemStyle: {normal: {color:"rgba(0,185,96,.85)"},},
					        data: tbData,
					    }, {
					        name: '环比增长',
					        type: 'line',
					        smooth: true,
					        showAllSymbol: true,
					        symbol: 'emptyCircle',
					        symbolSize: 8,
					        yAxisIndex: 1,
					        itemStyle: {normal: {color:"rgba(113,129,248,.85)"},},
					        data: hbData,
					    },
					   ]
					};
					var Chart = echarts.init(document.getElementById('y_qs'));
					Chart.setOption(option);	
				}
				//y_qs_fun();

				function n_qs_fun(thisData,lastData){
					//var lastData = [3301,2724,3127,3013,3135,3815,2845,2897,2397,2610,2785,3626];
					//var thisData = [3091,3085,3181,2600,3537,2761,2506,3348,2618,2841,3787,3310];
					var tbData = [];
					var hbData = [];
					var category = [];
					var maxCategory = 12;        
					for (var i = 0; i < maxCategory; i++) {
					    var this_i= i+1;
					    category.push(this_i+'月');
					    tbData[i] = (((thisData[i]-lastData[i])/lastData[i])*100).toFixed(2);
					    if(i < 1){
					    	hbData[i]=(((thisData[i]-lastData[maxCategory-1])/lastData[maxCategory-1])*100).toFixed(2);
					    }else{
					    	hbData[i]=(((thisData[i]-thisData[i-1])/thisData[i-1])*100).toFixed(2);
					    };
					}
					option = {
					    title: {text: "一年趋势分析",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
					    
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {type: 'shadow',label: {show: true} }
					    },
					    legend: {
					        data: ['上一期','本期', '同比增长','环比增长'],
					        textStyle: {color: '#B4B4B4',fontSize: 12,},
					        top:'7%',
					    },
					    grid:{x:'10%',width:'80%',y:'15%'},
					    xAxis: {
					        data: category,
					        axisLine: {lineStyle: {color: '#B4B4B4'}},
					        axisTick:{show:true,},
					        axisLabel:{interval: 0,},
					    },
					    yAxis: [{
					    	  name:'数量',
					    		nameLocation:'end',
					        splitLine: {show: false},
					        axisLine: {lineStyle: {color: '#B4B4B4',}},
					        axisLabel:{formatter:'{value}',}       
					    },{
					    	  name:'增长率',
					    		nameLocation:'end',
					        splitLine: {show: false},
					        axisLine: { lineStyle: {color: '#B4B4B4',}},
					        axisLabel:{formatter:'{value}',}
					    }],
					    series: [{
					        name: '上一期',
					        type: 'bar',  
					        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
					        itemStyle: {
					            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}])}
					        },
					        data: lastData,
					    },{
					        name: '本期',
					        type: 'bar',  
					        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
					        itemStyle: {
					            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}])}
					        },
					        data: thisData,
					    },{
					        name: '同比增长',
					        type: 'line',
					        smooth: true,
					        showAllSymbol: true,
					        symbol: 'emptyCircle',
					        symbolSize: 8,
					        yAxisIndex: 1,
					        itemStyle: {normal: {color:"rgba(0,185,96,.85)"},},
					        data: tbData,
					    }, {
					        name: '环比增长',
					        type: 'line',
					        smooth: true,
					        showAllSymbol: true,
					        symbol: 'emptyCircle',
					        symbolSize: 8,
					        yAxisIndex: 1,
					        itemStyle: {normal: {color:"rgba(113,129,248,.85)"},},
					        data: hbData,
					    },
					   ]
					};
					var Chart = echarts.init(document.getElementById('n_qs'));
					Chart.setOption(option);	
				}
				//n_qs_fun();


				function sn_qs_fun(thisData,lastData,thisyear){
							
							// var lastData = [3301,2724,3127,3013,3135,3301,2724,3127,3013,3135];
							// var thisData = [3091,3085,3181,2600,3537,3301,2724,3127,3013,3135];
							//console.log(thisData);
							var tbData = [];
							var hbData = [];
							var category = [];
							// console.log((thisyear-10)%10);
							// if(thisyear -10>2000){
							// 	var startx = ((thisyear -10)%10)+1;	
							// }
							var startx = thisyear-9;
							//console.log(startx);
							var maxCategory = 10;        
							for (var i = 0; i < maxCategory; i++) {
							    var this_i= i+startx;
							    if(Number(this_i)<10){
							    	this_i = "0" + this_i;
							    }
							    category.push(this_i);
							    tbData[i] = (((thisData[i]-lastData[i])/lastData[i])*10).toFixed(2);

							    if(i < 1){
							    	hbData[i]=(((thisData[i]-lastData[maxCategory-1])/lastData[maxCategory-1])*10).toFixed(2);
							    }else{
							    	hbData[i]=(((thisData[i]-thisData[i-1])/thisData[i-1])*10).toFixed(2);
							    };
							}
							
							option = {
							    title: {text: "十年趋势分析",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
							   
							    tooltip: {
							        trigger: 'axis',
							        axisPointer: {type: 'shadow',label: {show: true} }
							    },
							    legend: {
							        data: ['本期','环比增长'],
							        textStyle: {color: '#B4B4B4',fontSize: 12,},
							        top:'7%',
							    },
							    grid:{x:'10%',width:'80%',y:'15%'},
							    xAxis: {
							        data: category,
							        axisLine: {lineStyle: {color: '#B4B4B4'}},
							        axisTick:{show:true,},
							        axisLabel:{interval: 0,},
							    },
							    yAxis: [{
							    	  name:'数量',
							    		nameLocation:'end',
							        splitLine: {show: false},
							        axisLine: {lineStyle: {color: '#B4B4B4',}},
							        axisLabel:{formatter:'{value}',}       
							    },{
							    	  name:'增长率',
							    		nameLocation:'end',
							        splitLine: {show: false},
							        axisLine: { lineStyle: {color: '#B4B4B4',}},
							        axisLabel:{formatter:'{value}',}
							    }],
							    series: [{
							        name: '本期',
							        type: 'bar',  
							        label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
							        itemStyle: {
							            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}])}
							        },
							        data: thisData,
							    }, {
							        name: '环比增长',
							        type: 'line',
							        smooth: true,
							        showAllSymbol: true,
							        symbol: 'emptyCircle',
							        symbolSize: 8,
							        yAxisIndex: 1,
							        itemStyle: {normal: {color:"rgba(113,129,248,.85)"},},
							        data: hbData,
							    },
							   ]
							};
							var Chart = echarts.init(document.getElementById('wn_qs'));
							Chart.setOption(option);	
				}



				function calc(data,datahours,datamonth,dataday){
					//console.log(datahours);
					//十年分析图数据
					$.ajax({
						type:'GET',
						url:'api/alarmTrend/getByYear',

					    data:data,
					    scriptCharset:'utf-8',
					    success:function(data){
					    	tenyearsdata = JSON.parse(data).reverse();
					    	//console.log(tenyearsdata);
					    	var thisyear = tenyearsdata[10].year;
					    	
					    	var thisData = new Array ;
					    	var lastData = new Array ;

					    	for(var i=0; i<tenyearsdata.length-1; i++){
								lastData.push(tenyearsdata[i].sum);
							}


							for(var i=1; i<tenyearsdata.length; i++){
								thisData.push(tenyearsdata[i].sum)
							}
							//console.log(thisData,lastData);
					    	sn_qs_fun(thisData,lastData,thisyear);
					    	
					    	//console.log(selectdate);	
					    }
					})

					//一日趋势图
					$.ajax({
							type:'GET',
							url:'api/alarmTrend/getByHour',
							
						    // data:{
						    // 	date:"20180101",
						    // 	field:"FKSl"
						    // },
						    data:datahours,
						    scriptCharset:'utf-8',
						    success:function(data){
						    	var data = JSON.parse(data)
						    	//console.log(data[0]);
						    	//console.log(data[1]);
						    	var thisData = new Array ;
						    	var lastData = new Array ;
						    	//console.log(data[0].result.length);
						    	for(var i=0; i<data[0].result.length; i++){
									thisData.push(data[0].result[i].sum);
									//console.log(data[0].result[i].sum);

								}
								for(var i=0; i<data[1].result.length; i++){
									lastData.push(data[1].result[i].sum);
									//console.log(data[1].result[i].sum);

								}
								//console.log(thisData,lastData);
								r_qs_fun(thisData,lastData);
						    }
					})

					//一年趋势分析
					$.ajax({
							type:'GET',
							url:'api/alarmTrend/getByMonth',
							data:datamonth,
						    // data:{
						    // 	date:"20180101",
						    // 	field:"FKSL"
						    // },
						    //data:datahours,
						    scriptCharset:'utf-8',
						    success:function(data){
						    	var data = JSON.parse(data);
						    	// console.log(data);
						    	// console.log(data[0]);
						    	// console.log(data[1]);
						    	var thisData = new Array ;
						    	var lastData = new Array ;
						    	//console.log(data[0].result.length);
						    	for(var i=0; i<data[0].result.length; i++){
									thisData.push(data[0].result[i].sum);
									//console.log(data[0].result[i].sum);

								}
								for(var i=0; i<data[1].result.length; i++){
									lastData.push(data[1].result[i].sum);
									//console.log(data[1].result[i].sum);

								}
								//console.log(thisData,lastData);
								// r_qs_fun(thisData,lastData);
								n_qs_fun(thisData,lastData);
						    }
					})

					//一月趋势分析
					$.ajax({
							type:'GET',
							url:'api/alarmTrend/getByDay',
							data:dataday,
						    
						    scriptCharset:'utf-8',
						    success:function(data){
						    	var data = JSON.parse(data);
						    	// console.log(data);
						    	// console.log(data[0]);
						    	// console.log(data[1]);
						    	var thisData = new Array ;
						    	var lastData = new Array ;
						    	//console.log(data[0].result.length);
						    	for(var i=0; i<data[0].result.length; i++){
									thisData.push(data[0].result[i].sum);
									//console.log(data[0].result[i].sum);

								}
								for(var i=0; i<data[1].result.length; i++){
									lastData.push(data[1].result[i].sum);
									//console.log(data[1].result[i].sum);

								}
								//console.log(thisData,lastData);
								// r_qs_fun(thisData,lastData);
								y_qs_fun(thisData,lastData);
						    }
					})
				}


		} 
		jq();
	})
	
export const Mate = {
	getNumDate(dateTime){
	  var min = 1000 * 60;
	  var hour = min * 60;
	  var day = hour * 24;
	  var halfMonth = day * 15;
	  var month = day * 30;
	  var year = day * 365;
	  var now = new Date().getTime();
	  var diff = now - dateTime;
	  if(diff<0){
	    return "数据出错"
	  }
	  var yearC = diff / year;
	  var monthC = diff / month;
	  var weekC = diff / (day * 7);
	  var dayC = diff / day;
	  var hourC = diff / hour;
	  var minC = diff / min;
	  var result;
	  if(yearC >= 1){
	    result = parseInt(yearC) + '年以前';
	  }else if(monthC >= 1){
	    result = parseInt(monthC) + '个月前';
	  }else if(weekC >= 1){
	    result = parseInt(weekC) + '星期前';
	  }else if(dayC >= 1){
	    result = parseInt(dayC) + '天前';
	  }else if(hourC >= 1){
	    result = parseInt(hourC) + '小时前';
	  }else if(minC >= 5){
	    result = parseInt(minC) + '分钟前';
	  }else{
	    result = '刚刚发表';
	  }
	  return result;
	}
}

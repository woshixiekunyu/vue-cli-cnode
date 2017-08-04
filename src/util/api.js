//基础路径
var baseUrl = 'https://cnodejs.org/api/v1';
//主题
var topic = baseUrl + '/topic';
//新建主题
var buildTopic = baseUrl+'/topics';
//编辑主题
var writeTopic = baseUrl +'/topics/update';
//收藏主题
var collectTopic = baseUrl+'/topic_collect/collect';
//取消主题
var notCollectTopic = baseUrl + '/topic_collect/de_collect';
//查看收藏的主题
function lookCollectTopic(id){
	return baseUrl + 'topic_collect/'+id;
}
//新建评论
function vuildDisc(id){
	return baseUrl + '/topic/'+id+'/replies';
}
//点赞
function zan(id){
	return baseUrl + '/reply/'+id+'/ups';
}
//登录验证
var isLogon = baseUrl + '/accesstoken';



module.exports = {
	topic:topic,
	buildTopic:buildTopic,
	writeTopic:writeTopic,
	collectTopic:collectTopic,
	notCollectTopic:notCollectTopic,
	lookCollectTopic:lookCollectTopic,
	vuildDisc:vuildDisc,
	zan:zan,
	isLogon:isLogon
}

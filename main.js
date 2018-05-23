Vue.use(VeeValidate, {
	locale: 'zh_CN',
	dictionary:{
		zh_CN: {
		    attributes: {
		    		code: '企业登录账户',
		    		appKey: '企业appKey',
		    		appSecret: '企业appSecret',
		    		name: '企业简称',
		    		fullName: '企业全称'
		    }
		  }
	}
});

const dict = {
		custom: {
			code: {
			    	required: (name) => name + '不能为空！',
			    	  min: (name) => name + '至少4个字母或数字',
			    	  max: (name) => name + '最多8个字母或数字'
			 },
			  appKey: {
			      required: (name) => name + '不能为空！',
			    	  max: (name) => name + '最多支持32个字符'
			  },
			  appSecret: {
			    	required: (name) => name + '不能为空！',
			    	  max: (name) => name + '最多支持32个字符'
			 },
			  name: {
			      required: (name) => name + '不能为空！',
			      max: (name) => name + '最多支持16个字符'
			  },
			  fullName: {
			    	required: (name) => name + '不能为空！',
			    	  max: (name) => name + '最多支持64个字符'
			 }
		  }
		};
//错误提示信息内容切换
VeeValidate.Validator.localize('zh_CN', dict);

var vm = new Vue({
	el:'#rrapp',
	data:{
	},
	methods: {
		add: function(){
			//清空错误信息
			this.errors.clear();
		},
		saveOrUpdate: function (event) {
			var url = vm.companyAccount.id == null ? "../companyaccount/save" : "../companyaccount/update";
			
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.companyAccount),
			    success: function(r){
			    	if(r.code === 0){
			    		vm.reload();
					}else{
						alert(r.msg);
					}
				}
			});
		}
		,submitForm: function() {
			//提交前验证
			this.$validator.validateAll().then(function(success) {
				if (!success) {
					return;
				}
				else{
					vm.saveOrUpdate();
				}
	        })
	    }
	}
});
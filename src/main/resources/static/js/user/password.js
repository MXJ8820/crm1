layui.use(['form','jquery','jquery_cookie'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery,
        $ = layui.jquery_cookie($);

    /**
     * 用户密码修改 表单提交
     */
    form.on("submit(saveBtn)",function (data){

        // 获取表单元素的内容
        var fieldData = data.field;
        //发送ajax对接后端密码修改接口实现密码修改操作
        $.ajax({
           type:"post",
            url:ctx+"/user/updatePassword",
            data:{
                oldPassword:fieldData.old_password,
                newPassword:fieldData.new_password,
                confirmPwd:fieldData.again_password
            },
            dataType:"json",

            //接收后端传过来的信息(是否报错即是否修改成功)
            success:function (data){
                // 判断是否成功
               if(data.code==200){
                    // 修改成功后，用户自动退出系统
                    layer.msg("修改成功了,系统将在3秒后推出...",function (){
                        // 退出系统后，删除对应的cookie
                        $.removeCookie("userIdStr",{domain:"localhost",path:"/crm"});
                        $.removeCookie("userName",{domain:"localhost",path:"/crm"});
                        $.removeCookie("trueName",{domain:"localhost",path:"/crm"});
                        //跳转到登录页面 (父窗口跳转)
                        window.parent.location.href=ctx+"/index";
                    });

               }else {
                   //提示信息
                   layer.msg(data.msg);
               }
            }

        });

        //取消默认表单的跳转
        return false;

    });

});
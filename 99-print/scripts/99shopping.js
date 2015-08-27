 $(function() {
     //实现滚动条
     $('#container').mCustomScrollbar();
     //计算总价 	
     var $all_gross = $('.gross-price'),
     	 $total_price = $('.total-price');
     function changeGross($single,$gross,pages){
     	var single_price = Number($single.html());
     	$gross.html(Number(pages)*single_price);

     }
     function totalPrice($gross,$total){
     	var temp =0;
     	$gross.each(function(){
     		temp+=Number($(this).text());
     	})
     	$total.html(temp);
     }
     totalPrice($all_gross,$total_price);
     $('.pages').on('blur', function() {
         var $tr = $(this).parent().parent(), //找到点击的元素所在的行
             $single = $tr.find('.single'), //获取单价
             $gross = $tr.find('.gross-price'), //获取总价
             reg = /^\d+$/,
             pages = $(this).val().trim();
         if (!reg.test(pages)) {
             alert("输入的份数必须为整数");
             $(this).focus();
         } else {
         	changeGross($single,$gross,pages)	//计算出商品总价      
         	totalPrice($all_gross,$total_price);   	
         }
     })
     $('.page-size').on('change',function(){
     	var single_price,	//单价
     		$tr = $(this).parent().parent(),
     		$single = $tr.find('.single'),
     		$gross = $tr.find('.gross-price'),
     		pages = $tr.find('.pages').val();
     	switch($(this).val()){
     		case "A1":
     			single_price = 3;
     			break;
     		case "A2":
     			single_price = 2.5;
     			break;
     		case "A3":
     			single_price = 2;
     			break;
     		case "A4":
     			single_price = 1.5;
     			break;
     	}
     	$single.html(single_price);
     	changeGross($single,$gross,pages);
     	totalPrice($all_gross,$total_price);
     })
 })
 //!计算总价 
 //结算
 	$('input[name="method"]').on('change',function(event){
 		var $pick = $('.pick'),
            $deliver = $('.deliver'),
            method = $(this).val();
        if(method === "到店自取"){
            $pick.show().siblings().hide();
        }else if(method === "送货上门"){
            $deliver.show().siblings().hide();
        }
 	})
    
    $('.clearing').on('click',function(){
        var method = $('input[name="method"]:checked').val();
        if(method === "到店自取"){

        }else if(method === "送货上门"){
            var $phone = $('.phone'),
                phone_text = $phone.val().trim(),
                reg = {
                    phone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                    mobile:/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
                },
                $address = $('.address'),
                address_text = $address.val().trim();
                remind = "";
                console.log(typeof address_text);
            if(!(reg.mobile.test(phone_text)||reg.phone.test(phone_text))){
                remind = "号码输入有误";
            }
            if(address_text == ""){
                remind += ",地址不能为空!"
            }
            if(remind != ""){
                alert(remind);
            }
        }else{
            alert("请选择收货方式!");
        }
        
    })
 // !结算

$(function() {
    //实现滚动条 
    $("#orders-container").mCustomScrollbar({});
    //修改订单
    var $change = $(".change-info"), //修改订单
        $cancel = $('.cancel-order'), //取消订单
        _save = false;
    //根据收货方式不同,变换address的表达方式
    function toggleInfo(text, address) {
        var $deliver = $('.delivering'),
            $pick = $('.self-pick'),
            $temp;
        if (text === "送货上门") {
            $deliver.css('display', 'block')
                .siblings().css('display', 'none'); //将自取框隐藏            
            $temp = $deliver;
        } else if (text === "到店自取") {
            $pick.css('display', 'block')
                .siblings().css('display', 'none'); //将送货框隐藏            
            $temp = $pick;
        }
        if (address) {
            $temp.val(address);
        }
    }

    function changeInfo($method, $address) {
        var text = $method.text().trim(), //获取收获方式
            address = $address.text().trim(); //当前地址
        //替换method内容，使其变得可选.
        $method.html('<select class="receiving-method" name="deliver-address" id="address"><option value="送货上门">送货上门</option><option value="到店自取">到店自取</option></select>');
        $address.html('<input class="delivering" type="text"><select class="self-pick"><option value="韵苑">韵苑</option><option value="紫松">紫松</option><option value="沁园">沁园</option></select>');
        var $receiving = $('.receiving-method');
        $receiving.val(text); //设置收货方式信息
        toggleInfo(text, address);
        $receiving.on('change', function() {
            toggleInfo($(this).val());
        });
    }

    function saveInfo($method, $address) {
        _save = false; //标识是否可以保存
        var temp = $address.children(':visible').val().trim(), //获取当前收货地址信息
            method = $method.children().val().trim(); //获取收货方式           
        if (temp === "") {
            alert("地址不能为空");
            return;
        } else {
            $address.html(temp);
            $method.html(method);
            _save = true;
        }

    }
    $change.on('click', function() {
        var $val = $(this).text(),
            $table = $(this).siblings('table'),
            $method = $table.find('td[role="receiving-method"]'), //获取收货方式
            $address = $table.find('td[role="deliver-address"]'); //获取收货地址      
        if ($val === "修改收货信息") {
            $(this).text('保存');
            changeInfo($method, $address); //修改订单信息
        } else {
            saveInfo($method, $address);
            if (_save) {
                $(this).text('修改收货信息');
            }
        }
    })
    $cancel.on('click', function() {
        var $moda = $('#warning'),
            $this = $(this);
        $moda.modal('show');
        $moda.find('#confirm').on('click', function() {
            console.log(1);
            $moda.modal('hide');
            $this.parent('li').detach();
        })
    })
    //!修改订单

    //切换订单mode
    var $prev =$("[role='prev-orders']"),
        $doing =$('[role="doing-orders"]'),
        $history = $('[role="history-orders"]'),
        $temp;

    $(".toggle-btn").on('click',function(event){
        $this = $(event.target);
        if($this.hasClass('pre-orders')){
           $temp = $prev;
        }else if($this.hasClass('doing-orders')){
            $temp = $doing ;
        }else if($this.hasClass('history-orders')){
            $temp = $history;
        }
        console.log($temp);
        $temp.css('display','block').siblings().css('display','none');
        $this.addClass('show').siblings().removeClass('show');
    })
    //!切换订单mode
})

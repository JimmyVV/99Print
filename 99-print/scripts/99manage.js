 $(function() {
     //左侧栏的点击事件
     var $sub = $('.sub-user'), //子标题ul
         $shop_btn = $('.shop-btn'), //管理打印店btn
         $user = $('.user'); //管理用户btn
     //子标题点击事件处理
     var ToggleBtn = {
         init: function() {
             this.all_btns = '<button role="manager">管理员</button>' +
                 '<button role="VIP">会员</button>' +
                 '<button role="deliver">配送员</button>';
             this.authorize = $('.authorize');
             this.others_btns = '<button role="cancel">取消授权</button>';
             this.btns = $('.member-btns');
             this.manage = "<button role='add'>添加</button>" + '<button role="delete">删除</button>';
         },
         changeAll: function() {
             this.btns.html(this.all_btns);
             this.authorize.show();
         },
         changeOthers: function() {
             this.btns.html(this.others_btns);
             this.authorize.show();
         },
         changeManage: function() {
             this.btns.html(this.manage);
             this.authorize.hide();
         }
     }
     $sub.find('span').on('click', function(event) {
         var $sub_span = $(this);
         $sub.find('.show').removeClass('show');
         $sub_span.addClass('show');
         $shop_btn.removeClass('show');
         $user.addClass('show');
         ToggleBtn.init();
         if ($sub_span.html() === "全部") {
             ToggleBtn.changeAll();
         } else {
             ToggleBtn.changeOthers();
         }
     })

     //!子标题点击事件处理
     //父标题事件处理
     //管理打印店
     $shop_btn.on('click', function() {

             $shop_btn.addClass('show');
             $user.removeClass('show');
             $sub.find('.show').removeClass('show');
             ToggleBtn.init();
             ToggleBtn.changeManage();
         })
         //管理打印店
     $user.on('click', function() {
             $shop_btn.removeClass('show');
             $user.addClass('show');
             $sub.find('.show').removeClass('show');
             $sub.find('span').eq(0).addClass('show');
             ToggleBtn.init();
             ToggleBtn.changeAll();
         })
         //!父标题事件处理
         //!左侧栏的点击事件
         //加载滚动条
     $('#table-container').mCustomScrollbar();
     //实现全选
     var Select_all = {
         toggleChecked: function($element) {
             $element.each(function() {
                 if ($(this).attr('checked') === 'checked') {
                     $(this).attr('checked', false);
                     $(this).next().find('i').removeClass('show');
                 } else {
                     $(this).attr('checked', 'checked');
                     $(this).next().find('i').addClass('show');
                 }
             })
         },
         addChecked: function($element) {
             $element.each(function() {
                 $(this).attr("checked", true);
                 $(this).next().find('i').addClass('show');
             })
         },
         loseChecked: function($element) {
             $element.each(function() {
                 $(this).attr('checked', false);
                 $(this).next().find('i').removeClass('show');
             })
         }
     }
     $('#select-all').on('click', function() {
         var $select_all = $(this),
             $user_lists = $('#user'),
             $sub_boxes = $user_lists.find('input[name="sub-box"]'),
             $i = $('.logo-checkbox');
         if ($select_all.prop('checked')) {
             Select_all.addChecked($sub_boxes);
             Select_all.addChecked($select_all);
         } else {
             Select_all.loseChecked($sub_boxes);
             Select_all.loseChecked($select_all);
         }

     })
     $('#user').on('click', function(event) {
             var $sub_boxes = $(this).find('input[name="sub-box"]'),
                 $select_all = $('#select-all'),
                 $target = $(event.target),
                 sign = false;
             Select_all.toggleChecked($target);
             $sub_boxes.each(function() {
                 if ($(this).attr('checked') !== 'checked') {
                     sign = true;
                 }
             })
             if (sign) {
                 Select_all.loseChecked($select_all);
             } else {
                 Select_all.addChecked($select_all);
             }
         })
         //!实现全选
         //实现授权,删除等功能
     var Operation = {
         init: function() {
             this.items = $('.content').find('input[checked="checked"]')
                 .parents('tr');
             this.changeItems = this.items.find('div[role="title"]'); //找到授权名称
         },
         changeTitle: function(title) { //授权
             this.changeItems.html(title);
         },
         deleteItem:function(){ //删除选中项目
            this.items.detach();
         }
     }
     $('#operation').on('click', function(event) {
         Operation.init();
         var $target = $(event.target),
             title = $target.html(),
             role = $target.attr('role');
         if (role === 'manager') {
             Operation.changeTitle(title);
         } else if (role === 'VIP') {
             Operation.changeTitle(title);
         } else if (role === 'deliver') {
             Operation.changeTitle(title);
         } else if (role === "cancel") {
             Operation.changeTitle("");
         } else if (role === "add") {
             $(".add-shops").show();
         } else if (role === "delete") {
            Operation.deleteItem();
         }
     })
     //！实现授权,删除功能
     //添加新的打印店
        $('.save-btn').on('click',function(){
            
        })        
     //!添加新的打印店
     //修改信息
        $('.logo-change').on('click',function(){
             $(".add-shops").show();
        });
     //!修改信息
     //切换u
 })

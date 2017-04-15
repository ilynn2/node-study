$(function(){
	$('.btn_show').on('click',function(){
		if($($(this).attr('_target')).prop('type')=='text')
				$($(this).attr('_target')).prop('type','password');
		else	$($(this).attr('_target')).prop('type','text');
	});
});

//===================쿠키 사용을 위해
/**
  * 쿠키 설정
  * @param cookieName 쿠키명
  * @param cookieValue 쿠키값
  * @param expireDay 쿠키 유효날짜
*/
function setCookie( cookieName, cookieValue, expireDate ){
	var today = new Date();
	today.setDate( today.getDate() + parseInt( expireDate ) );
	document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";";
}

 

/**
  * 쿠키 삭제
  * @param cookieName 삭제할 쿠키명
*/
function deleteCookie( cookieName ){
	var expireDate = new Date();
	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

 

/**
  * 자신이 지정한 값으로 쿠키 설정
*/
function setMyCookie(){
	setCookie( form.setName.value, form.setValue.value, form.expire.value );
	viewCookie(); // 전체 쿠키 출력 갱신
}
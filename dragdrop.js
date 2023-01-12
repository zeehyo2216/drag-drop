window.onload = function(){
    const dragobjs = document.querySelector(".left-sub"); //드래그할 img들이 담겨있는 div
    const cloneobjs = document.querySelector(".center-section"); // 드랍할 위치 (도면) div 

    for (objs of [dragobjs, cloneobjs]){
        //윈도우 우클릭 메뉴기능 비활성화
        window.oncontextmenu = function () {
            return false;
        };
        //우클릭 이벤트핸들러 - 이미지 요소 제거 
        objs.addEventListener("contextmenu", function (event){
            let _dragobj = event.target.closest('img'); //마우스 클릭 이벤트에 가장 가까운 img 저장
            if (!_dragobj) {return;}   
            _dragobj.remove();
        })    
        //mousedown 이벤트핸들러
        objs.addEventListener("mousedown", function (event){
            let dragobj = event.target.closest('img');
            if (!dragobj) {return;}   
            
            if (event.target.className == "editable") {
                cloneobj = dragobj; //도면 위의 이미지 클릭시, 그 이미지 요소를 조작
            }else {
                cloneobj = dragobj.cloneNode(true); //클릭한 이미지의 클론 요소를 생성
            }

            cloneobj.style.position = 'absolute';
            cloneobj.style.zIndex = 1;
            cloneobj.style.cursor = "move";
            cloneobj.setAttribute("draggable", "false"); //브라우저 drag기능 비활성화
            cloneobj.setAttribute("class", "editable"); //클론 이미지 (원본이 아닌) 임을 명시
            document.body.append(cloneobj); //드래그 시에 움직임에 제한이 없도록 body에 추가

            document.querySelector(".left-section").style.display = 'none';
            document.querySelector(".left-section-button").style.display = 'none';

            function moveAt(pageX, pageY) {
                cloneobj.style.left = pageX - cloneobj.offsetWidth / 2 + 'px';
                cloneobj.style.top = pageY - cloneobj.offsetHeight / 2 + 'px';
            }
        
            moveAt(event.pageX, event.pageY);
            
            function onMouseMove(event) { 
            moveAt(event.pageX, event.pageY);
            }
            
            document.addEventListener('mousemove', onMouseMove);
        
            cloneobj.addEventListener("mouseup", function self() {
                document.removeEventListener('mousemove', onMouseMove); //mouseup 시, drag 비활성화
                document.querySelector(".center-section > main").append(cloneobj); //도면 구역으로 img 요소 붙이기
                cloneobj.style.left = (parseInt(getComputedStyle(cloneobj).left, 10)- 0.007*window.innerWidth)+'px';
                cloneobj.style.top = (parseInt(getComputedStyle(cloneobj).top, 10)- 0.01*window.innerHeight)+'px';

                document.querySelector(".left-section").style.display = 'block';
                document.querySelector(".left-section-button").style.display = 'block';
                cloneobj.removeEventListener('mouseup', self); //mouseup 핸들러도 제거
            })
        })
    }
}
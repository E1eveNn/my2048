/**
 * Created by Eleven on 2017/1/3.
 */
var board=new Array() //先声明一维
$(function () {
    //初始化布局
     init(4,4)
    $('body').click(function (e) {
        var target= e.target
        var personal=$('#personal')
        var gameover=$('#gameover')
       //console.log(target)
    })
})
function reStart(){
    var nowNumberCell=$('.number-cell:last')
    var nowR=nowNumberCell.data('row')+1
    var nowC=nowNumberCell.data('col')+1
    init(nowR,nowC)
    $('#gameover').hide()
}
function init(w,h){
    var wrap=$('.grid');
    wrap.empty();
    var wrapWidth=120*w+20
    var wrapHeight=120*h+20
    wrap.css('width',wrapWidth)
    wrap.css('height',wrapHeight)
    for(var i=0;i<w;i++){
        for(var j=0;j<h;j++){
          var gridCell=$('<div class="grid-cell"></div>')
            gridCell.attr('id','grid-cell-'+i+"-"+j)
            gridCell.css('top',setPos(i,null))
            gridCell.css('left',setPos(null,j))
            gridCell.appendTo(wrap)

        }
    }
    for(var i=0;i<w;i++){
        board[i]=new Array()
        for(var j=0;j<h;j++){
            board[i][j]=0
        }
        }
    updateBoard(w,h)
    generateNumber()
    generateNumber()
}

function generateNumber(){
    if(noPlace()){
        return false
    }
    //随机生成一个位置和数字并显示
    randomPos()

}
function randomPos(){
    var nowNumberCell=$('.number-cell:last');
    var nowR=nowNumberCell.data('row')+1;
    var nowC=nowNumberCell.data('col')+1;
    var numberX=parseInt(Math.floor(nowR*Math.random()));
    var numberY=parseInt(Math.floor(nowC*Math.random()));
    while(true){
        if(board[numberX][numberY]==0){
          break;
        }
        numberX=parseInt(Math.floor((nowR)*Math.random()))
        numberY=parseInt(Math.floor((nowC)*Math.random()))
    }
    showNumberAnimation(numberX,numberY,board)
}
function noPlace(){
    var nowNumberCell=$('.number-cell:last')
    var nowR=nowNumberCell.data('row')+1
    var nowC=nowNumberCell.data('col')+1
    for(i=0;i<nowR;i++){
        for(j=0;j<nowC;j++){
            if(board[i][j]==0){
                return false
            }
        }
    }
    return true
}
function setPos(i,j){
    if(i){
        return i*120+20
    }
    return j*120+20
}
function updateBoard(w,h){
    $('.number-cell').remove()
   for(i=0;i<w;i++){
       for(j=0;j<h;j++){
           $('.grid').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
           var nowNumberCell=$('#number-cell-'+i+"-"+j)
           nowNumberCell.css('top',setPos(i,null))
           nowNumberCell.css('left',setPos(null,j))
           nowNumberCell.attr('data-row',i)
           nowNumberCell.attr('data-col',j)
           if(board[i][j]==0){
               nowNumberCell.css('width','0px')
               nowNumberCell.css('height','0px')
           }else{
               nowNumberCell.css('width','100px')
               nowNumberCell.css('height','100px')
               nowNumberCell.css('background',setBackground(board[i][j]))
               nowNumberCell.css('color',setColor(board[i][j]))
               nowNumberCell.css('fontSize',setFont(board[i][j]))
               nowNumberCell.text(board[i][j])
           }
       }
   }
}
$(document).keydown(function (event) {
    switch(event.keyCode){
        //left
        case 37:
            if(moveToLeft()){
            generateNumber()
                isGameOver()
        }
            break;
        //up
        case 38:
            if(moveToUp()){
                generateNumber()
            }
            break;
        //right
        case 39:
            if(moveToRight()){
                generateNumber()
            }
            break;
        //down
        case 40:
            if(moveToDown()){
                generateNumber()
            }
            break;
        default :
            break;
    }
})
function moveToLeft() {
    var nowNumberCell = $('.number-cell:last')
    var nowR = nowNumberCell.data('row') + 1;
    var nowC = nowNumberCell.data('col') + 1;
    var LnowC=nowC-1
    if (!canMoveLeft(board))
        return false;
    //moveLeft
    for (var i = 0; i < nowR; i++) {
        for (var j = 0; j<LnowC; j++) {
                for (var k = j+1; k < nowC; k++) {
                    if (board[i][k] != 0 && noBlockHorizon(i, j, k, board)&&board[i][j]==0) {
                        //move
                            moveAnimation(i, k, i, j);
                            board[i][j] = board[i][k];
                            board[i][k] = 0;
                        //continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizon(i, j, k, board)) {
                            moveAnimation(i, k, i, j);
                            board[i][j] *=2;
                            board[i][k] = 0;
                        j++
                        }
                    //continue;
                }
            }
    }
function updateView(){
        updateBoard(nowR,nowC)
}
setTimeout(updateView,200)
        return true
    }
function moveToUp(){
    var nowNumberCell=$('.number-cell:last')
    var nowR=nowNumberCell.data('row')+1;
    var nowC=nowNumberCell.data('col')+1;
    var UnowC=nowC-1;//3
    if( !canMoveUp( board ) )
        return false;
    //moveUp
    for( var j = 0 ; j< nowC ; j ++ ) {
        for (var i = 0; i < UnowC; i++) {
                for (var k = i+1; k < nowC; k++) {
          //j为列，i为行，k为i以上的行
                    if (board[k][j] != 0 && noBlockVertical(j, i, k, board)&&board[i][j]==0) {
                        moveAnimation(k, j, i, j);
                        board[i][j] = board[k][j];
                        board[k][j] = 0;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        moveAnimation(k, j, i, j);
                        board[i][j] *= 2;
                        board[k][j] = 0;
                        i++
                    }
                }
        }
    }
    function updateView(){
        updateBoard(nowR,nowC)
    }
    setTimeout(updateView,200)
    return true
}
function moveToRight(){
    var nowNumberCell=$('.number-cell:last')
    var nowR=nowNumberCell.data('row')+1;
    var nowC=nowNumberCell.data('col')+1;
    var RnowC=nowC-1 //3
    if( !canMoveRight( board ) )
        return false;
    //moveRight
    for( var i = 0 ; i < nowR; i ++ ){
        for( var j = RnowC ; j >0; j-- ){

                for( var k =j-1; k >=0 ; k -- ){
                    if( board[i][k] != 0 && noBlockHorizon( i , k , j , board )&&board[i][j]==0 ){
                        //move
                        moveAnimation( i , k , i , j );
                        board[i][j] = board[i][k];
                        board[i][k] = 0;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizon( i , k , j, board ) ){
                        //move
                        moveAnimation( i , k , i , j );
                        //add
                        board[i][j] *=2;
                        board[i][k] = 0;
                        j--
                    }
                }
        }
    }
    function updateView(){
        updateBoard(nowR,nowC)
    }
    setTimeout(updateView,200)
    return true
}
function moveToDown(){
    var nowNumberCell=$('.number-cell:last')
    var nowR=nowNumberCell.data('row')+1
    var nowC=nowNumberCell.data('col')+1
    var RnowR=nowR-1
    if( !canMoveDown( board ) )
        return false;
    //moveDown
    for( var j = 0 ; j < nowC; j ++ )
        for( var i = RnowR; i > 0 ; i -- ){
                for( var k=i-1 ; k >= 0 ; k -- ){

                    if( board[k][j] != 0 && noBlockVertical( k , i , j , board )&&board[i][j]==0 ){
                        moveAnimation( k , j , i , j );
                        board[i][j] = board[k][j];
                        board[k][j] = 0;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( k , i , j , board ) ){
                        moveAnimation( k , j , i , j );
                        board[i][j] *= 2;
                        board[k][j] = 0;
                        i--
                }
            }
        }
    function updateView(){
        updateBoard(nowR,nowC)
    }
    setTimeout(updateView,200);
    return true;
}

function isGameOver(){
    var nowNumberCell=$('.number-cell:last')
    var nowR=nowNumberCell.data('row')+1
    var nowC=nowNumberCell.data('col')+1
    for(i=0;i<nowR;i++){
        for(j=0;j<nowC;j++){
            if(board[i][j]==0){
                return false
            }
            else if(!canMoveLeft()&&!canMoveRight()&&!canMoveUp()&&!canMoveDown()){
                ////if(board[i][j]==board[i][j+1]||board[i][j]==board[i][j-1]||board[i][j]==board[i-1][j]||board[i][j]==board[i+1][j]){
                //    return false
                //}
                $('#gameover').show(200)
                return true
            }
        }
    }
}

function showForm(){
    $('#personal').show(500)
}
function getPerData(){
    var personal=$('#personal')
    var row=personal.find('input')[0].value;
    var col=personal.find('input')[1].value;
    if(row==null||row==0&&col==null||col==0){
        return
    }
    init(col,row)
    personal.hide()
  $('#personal input').val('')
}




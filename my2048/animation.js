/**
 * Created by Eleven on 2017/1/3.
 */
function showNumberAnimation(x,y,board){
    var randomNumber=Math.random()>=0.5?2:4
    board[x][y]=randomNumber
    var theNumberCell=$('#number-cell-'+x+"-"+y)
    theNumberCell.animate({
        width:'100px',
        height:'100px'
    },30)
    theNumberCell.css('background',setBackground(randomNumber))
    theNumberCell.css('color',setColor(randomNumber))
    theNumberCell.text(randomNumber)
}

function moveAnimation(fromx,fromy,tox,toy){
    var numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:setPos(tox,null),
        left:setPos(null,toy)
    },200)
    var toNumberCell=$('#number-cell-'+tox+'-'+toy);
    toNumberCell.animate({
        width:'150px',
        height:'150px'
    },50).animate({
        width:'100px',
        height:'100px'
    },50)
}

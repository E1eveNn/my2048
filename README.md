   <div class="container">
   
    <link href="https://github.com/eLeVeNnN/my2048/blob/master/my2048/style-pc.css" rel="stylesheet" type="text/css">
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://github.com/eLeVeNnN/my2048/blob/master/my2048/midware.js"></script>
    <script src="https://github.com/eLeVeNnN/my2048/blob/master/my2048/animation.js"></script>
    <script src="https://github.com/eLeVeNnN/my2048/blob/master/my2048/main.js"></script>
       <header>
       <div class="title">
       <h1>2048</h1>
       <p>Score:<span class="score">0</span></p>
       </div>
       <div class="btns">
           <a href="javascript:reStart()">New Game</a>
           <a href="javascript:init(3,3)">3x3</a>
           <a href="javascript:init(4,4)">4x4</a>
           <a href="javascript:init(5,5)">5x5</a>
           <a href="javascript:init(6,6)">6x6</a>
           <a href="javascript:showForm()">自定义</a>
       </div>
       </header>
       <section class="grid">
       </section>
       <div id="personal">
           <h1>自定义大小</h1>
           <label for="perRow">行：</label>
           <input type="text" id="perRow" placeholder="最好大于3">
           <br/>
           <label for="perCol">列：</label>
           <input type="text" id="perCol" placeholder="最好大于3">
           <br/>
           <button type="submit" onclick="getPerData()">确定</button>
       </div>
       <div id="gameover">
           <h1>啊哦，游戏结束！</h1>
           <a href="javascript:reStart()">再来一次</a>
       </div>
   </div>

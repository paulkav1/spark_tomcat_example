
var mba = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
var mapId = 'paulkav1.kj67p107';
var points = new L.LayerGroup();
var assets = [];
var clickables = [];
var Clickable = function (x, y, size, id){
    this.left = x;
    this.right = x + size;
    this.top = y;
    this.bottom = y + size;
    this.id = id;
};

 <#assign f = sub>
 var south = ${bbox[f][0][0]?c};
 var west = ${bbox[f][0][1]?c};
 var north = ${bbox[f][1][0]?c};
 var east = ${bbox[f][1][1]?c};

 var x1 = 1600;
 var y1 =  900;
 var x2 = east - west; 
 var y2 = north - south;

 var bbox = [[south,west],[north,east]];

 <#list rows as row>
     var asset = {type:"${row.type}", <#if row.pointList?has_content>loc:[</#if><#list row.pointList as point>[${point[0]?c!}, ${point[1]?c!}],</#list><#if row.pointList?has_content>],</#if> id:"${row.id}", isOpen:"${row.isOpen?c}", phases:"${row.phases}" };
     assets.push(asset);
 </#list> 

var regular = L.tileLayer('http://www.ledr.com/colours/white.jpg', {attribution:''});
var streets = L.tileLayer('http://{s}.tiles.mapbox.com/v3/' + mapId + '/{z}/{x}/{y}.png', {attribution:mba}); 

var centLat = (south + north) / 2
var centLong = (west + east) / 2
var map = L.map('map', {center: [centLat,centLong], maxBounds: bbox, zoom: 10, zoomControl: false, layers: [streets, points]});
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.fitBounds(bbox); 
var bounds = map.getBounds()  
south = bounds.getSouth();
north = bounds.getNorth();
west = bounds.getWest();
east = bounds.getEast();  
x2 = east - west; 
y2 = north - south;

var gridLayer = L.CanvasLayer.extend({
  render: function() {
    var canvas = this.getCanvas();
    var ctx = canvas.getContext('2d');
    drawNetwork(ctx);       
  }
});
var grid = new gridLayer();
var baseLayers = {"Regular": regular, "Streets": streets};
var overlays = {"Grid": grid};
L.control.layers(baseLayers, overlays).addTo(map);
 
$('#map').click(function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;    
    for (var i = 0; i < clickables.length; i++) {
        if (clickedX < clickables[i].right && clickedX > clickables[i].left && clickedY > clickables[i].top && clickedY < clickables[i].bottom) {
            assetID = clickables[i].id;
            $('#chyron').html('on ' + assets[assetID].type +' ' + assets[assetID].id);            
        }
    }
});

$('#map').dblclick(function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;    
    for (var i = 0; i < clickables.length; i++) {
        if (clickedX < clickables[i].right && clickedX > clickables[i].left && clickedY > clickables[i].top && clickedY < clickables[i].bottom) {
            $('#chyron').html('on ' + assets[assetID].type);
            assetID = clickables[i].id;            
            window.location.href = '/asset/' + assets[assetID].id;          
        }
    }
});

function drawNetwork(ctx){
    for (var i = 0; i < assets.length; i++){
       if (!assets[i].loc)
          continue;
       else 
       if (assets[i].type === "ACLineSegment")  
           drawLine(ctx, assets[i]);
       else 
           drawNode(ctx, assets[i], i);
    }    
}

function drawNode(ctx, asset, id){    
     loc = setPoint(asset.loc[0][0], asset.loc[0][1]);

     if (asset.type === 'Feeder'){
        ctx.fillStyle = 'rgb(250,250,0)';  //yellow   
        ctx.fillRect(loc[0], loc[1], 24, 24);
        var clickable = new Clickable(loc[0], loc[1], 24, id);
        clickables.push(clickable);                        
     }
     else if (asset.type === 'Switch'){
        if (asset.isOpen === "true"){
            ctx.fillStyle = 'rgb(250,50,50)';  //red             
        }else{
            ctx.fillStyle = 'rgb(50,250,50)';  //green                   
        }
        ctx.fillRect(loc[0], loc[1], 12, 12); 
        var clickable = new Clickable(loc[0], loc[1], 12, id);
        clickables.push(clickable);       
     }
     else if (asset.type === 'TransformerWinding'){    
        ctx.fillStyle = 'rgb(100,0,0)';  //maroon
        ctx.fillRect(loc[0], loc[1], 8, 8); 
        var clickable = new Clickable(loc[0], loc[1], 8, id);
        clickables.push(clickable);          
     }
     else if (asset.type === 'EnergyConsumer'){    
        ctx.fillStyle = 'rgb(255,155,155)';  //pink
        ctx.fillRect(loc[0], loc[1], 10, 10); 
        var clickable = new Clickable(loc[0], loc[1], 10, id);
        clickables.push(clickable);           
     }                        
     else if (asset.type === 'Fuse'){    
        ctx.fillStyle = 'rgb(20,20,20)';  //grey
        ctx.fillRect(loc[0], loc[1], 10, 10);
        var clickable = new Clickable(loc[0], loc[1], 10, id);
        clickables.push(clickable);                      
     }else{       
        ctx.fillStyle = 'rgb(0,100,250)';  //blue
        ctx.fillRect(loc[0], loc[1], 10, 10); 
        var clickable = new Clickable(loc[0], loc[1], 10, id);
        clickables.push(clickable);         
    }    
}

function drawLine(ctx, asset){
    var loc1 = setPoint(asset.loc[0][0], asset.loc[0][1]); 
    ctx.lineCap = 'round';    

    if (asset.phases === 'ABC'){
        for (var j = 0; j < asset.loc.length; j++){
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 6, 'rgb(180,50,50)');
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 4, 'rgb(50,180,50)');            
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 2, 'rgb(50,50,180)'); 
        }
    }      
    else if (asset.phases === 'A'){
        for (var j = 0; j < asset.loc.length; j++){
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 4, 'rgb(180,50,50)');
        }
    }              
    else if (asset.phases === 'B'){
        for (var j = 0; j < asset.loc.length; j++){
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 4, 'rgb(50,180,50)');
        }
    }             
    else if (asset.phases === 'C'){
        for (var j = 0; j < asset.loc.length; j++){
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 4, 'rgb(50,50,180)');
        }
    }             
    else if (asset.phases === 'N'){
        for (var j = 0; j < asset.loc.length; j++){
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 1, 'rgb(70,70,70)');
        }
    }
    else{    //wtf?
        for (var j = 0; j < asset.loc.length; j++){
            drawSegment(ctx, loc1, asset.loc[j], asset.phases, 3, 'rgb(200,200,200)');
        }
    }    
}

function drawSegment(ctx, loc1, loc2, phases, width, color){
    ctx.beginPath();       
    ctx.strokeStyle = color;
    ctx.lineWidth = width; 
    ctx.moveTo(loc1[0], loc1[1]);       
    var loc = setPoint(loc2[0], loc2[1]);     
    ctx.lineTo(loc[0], loc[1]);
    ctx.closePath();
    ctx.stroke();    
}

function setPoint(lat, long){
    if (!lat || !long) return [0,0]
    x = (long - west) * x1 / x2;
    y = (north - lat) * y1 / y2;
    return [x, y]
}

'use strict';
class SPlayer{
    constructor(option) {
        this.selector = option.selector || "#SPlayer";
        this.id=this.generateId(6);
        this.parentDom="";
        this.songs=option.songs;
        this.css=option.css || '//filehost.izhai.net/web/SP/newest/style.css';
        this.auto=option.auto || false;
        this.currentPlaying=0;
        this.loadCss();
        this.player=new Audio();
        this.createDom();
        this.initPlayer();
        this.initSong(this.songs[this.currentPlaying]);

    }

    loadCss(){
        let c=document.getElementById('splayer-css');
        if (c) return;
        c=document.createElement('link');
        c.href=this.css;
        c.rel='stylesheet';
        c.type='text/css';
        c.id='splayer-css';
        document.getElementsByTagName('head')[0].appendChild(c)
    }

    initSong(song){
        this.title.innerHTML=song.name;
        this.albumImg.src=song.img;
        this.album.innerHTML=song.album;
        this.player.src=song.url;
        this.singer.innerHTML=song.singer;
        console.log(this.player.duration)

    }

    nextSong(){
        if (this.currentPlaying+1 >this.songs.length-1 ) return;
        this.initSong(this.songs[++this.currentPlaying]);
        this.player.play();
    }
    prevSong(){
        if (this.currentPlaying-1 < 0 ) return;
        this.initSong(this.songs[--this.currentPlaying]);
        this.player.play();
    }



    getTime(t){
        let m=(t/60) | 0,
            s=(t%60) | 0;
        return  (m<10 ? '0'+m.toString() : m.toString() )+':'+(s<10 ? '0'+s.toString() : s.toString() );
    }

    initPlayer(){
        this.player.autoplay=this.auto;
        this.currentTime.innerHTML=this.getTime(0);
        this.player.addEventListener('loadedmetadata',(e) =>{
            this.totalTime.innerHTML=this.getTime(this.player.duration);
        });
        this.player.addEventListener('play',(e) =>{
            this.btnPlayStop.innerHTML="<i class=\"fa fa-pause\"></i>";
            this.stage.classList.add('sp-playing');
        });
        this.player.addEventListener('pause',(e) =>{
            this.btnPlayStop.innerHTML="<i class=\"fa fa-play\"></i>";
            this.stage.classList.remove('sp-playing');
        });
        this.player.addEventListener('timeupdate',(e) =>{
            this.currentTime.innerHTML=this.getTime(this.player.currentTime)
        });
        this.btnPlayStop.addEventListener('click',(e) =>{
            if (!this.player.paused){
                this.player.pause();
            }else{
                this.player.play();
            }
        });
        this.btnNext.addEventListener('click',(e) =>{
            this.nextSong();
        });
        this.btnPrev.addEventListener('click',(e) =>{
            this.prevSong();
        });
        this.btnLoop.classList.add('gray');
        this.btnLoop.addEventListener('click',(e) =>{
            if (this.player.loop){
                this.player.loop=false;
                this.btnLoop.classList.add('gray');
            }else{
                this.player.loop=true;
                this.btnLoop.classList.remove('gray');
            }
        });
        this.btnLyr.classList.add('gray');
    }
    generateId(length){
        let seed='1234567890abcdefjhijklmnopqrstuvwxyz';
        var rst="";
        for (var i=0;i<length;i++) rst += seed[Math.round(Math.random()*(seed.length-1))]
        return rst;
    }

    getParentDom(){
        switch (this.selector[0]){
            case '#':
                this.parentDom=document.getElementById(this.selector.substring(1));
                break;
            case '.':
                this.parentDom=document.getElementsByClassName(this.selector.substring(1))[0];
                break;
            default:
                this.parentDom=document.getElementsByTagName(this.selector)[0];
                break;
        }
        if (this.parentDom==null){
            throw new Error('CPlayer: Parent Dom has not been specified!');
        }
    }


    createDom(){
        var createEle = ({name,id,cls,html}) =>{
            var rst=document.createElement(name||'div');
            rst.className=cls || '';
            if (id) rst.id=id;
            rst.innerHTML=html || '';
            return rst;
        };
        if (!this.parentDom) this.getParentDom();

        //Create Elements

        var wrapper=createEle({id:'SPlayer-'+this.id,cls:'sp-wrapper'}),
            stage=createEle({cls:'sp-stage clearfix'}),
            albumImg=createEle({name:'img',cls:'sp-pic'}),
            right=createEle({cls:'sp-right'}),
            title=createEle({cls:'sp-title'}),
            meta=createEle(({cls:'sp-meta'})),
            album=createEle({cls:'meta-album'}),
            singer=createEle({cls:'meta-singer'}),
            hint=createEle({cls:'sp-hint'}),
            control=createEle({cls:'sp-control'}),
            processbarWrapper=createEle({cls:'sp-process-bar'}),
            processbarLoaded=createEle({cls:'bar-inner-loadded'}),
            processbarPlayed=createEle({cls:'bar-inner-played'}),
            panel=createEle({cls:'sp-panel'}),
            btnLoop=createEle({name:'button',cls:'sp-btn-loop',html:'<i class="fa fa-refresh"></i>'}),
            btnPrev=createEle({name:'button',cls:'sp-btn-prev',html:'<i class="fa fa-step-backward"></i>'}),
            btnPlayStop=createEle({name:'button',cls:'sp-btn-playstop',html:'<i class="fa fa-play"></i>'}),
            btnNext=createEle({name:'button',cls:'sp-btn-next',html:'<i class="fa fa-step-forward"></i>'}),
            btnLyr=createEle({name:'button',cls:'sp-btn-lyr',html:'<i class="fa fa-file-text"></i>'}),
            lyrStage=createEle({cls:'sp-lyr'}),
            timerWrapper=createEle({cls:'sp-timer'}),
            currentTime=createEle({name:'span',cls:'time-current'}),
            timeSeparator=createEle({name:'span',cls:'time-separator',html:'/'}),
            totalTime=createEle({name:'span',cls:'time-total'}),
            logo=createEle({cls:'sp-logo',html:'SPlayer'});


        //Add elements to the Dom
        this.parentDom.appendChild(wrapper);
        wrapper.appendChild(stage);
        stage.appendChild(albumImg);
        stage.appendChild(right);
        right.appendChild(title);
        right.appendChild(meta);
        meta.appendChild(album);
        meta.appendChild(singer);
        meta.appendChild(hint);
        right.appendChild(control);
        control.appendChild(processbarWrapper);
        processbarWrapper.appendChild(processbarLoaded);
        processbarWrapper.appendChild(processbarPlayed);
        control.appendChild(panel);
        panel.appendChild(btnLoop);
        panel.appendChild(btnPrev);
        panel.appendChild(btnPlayStop);
        panel.appendChild(btnNext);
        panel.appendChild(btnLyr);
        right.appendChild(lyrStage);
        right.appendChild(timerWrapper);
        timerWrapper.appendChild(currentTime);
        timerWrapper.appendChild(timeSeparator);
        timerWrapper.appendChild(totalTime);
        stage.appendChild(logo);
        [this.stage,this.albumImg,this.title,this.album,this.singer,this.processbarLoaded,this.processbarPlayed,this.btnLoop,this.btnPrev,this.btnPlayStop,this.btnNext,this.btnLyr,this.lyrStage,this.currentTime,this.totalTime] =  [stage,albumImg,title,album,singer,processbarLoaded,processbarPlayed,btnLoop,btnPrev,btnPlayStop,btnNext,btnLyr,lyrStage,currentTime,totalTime];

    }


}

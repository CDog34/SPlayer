'use strict';
class SPlayer{
    constructor(option) {
        this.selector = option.selector || "#SPlayer";
        this.id=this.generateId(6);
        this.parentDom="";
        this.createDom();
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
            currentTime=createEle({name:'span',cls:'current-time'}),
            timeSeparator=createEle({name:'span',cls:'time-separator'}),
            totalTime=createEle({name:'span',cls:'total-time'}),
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

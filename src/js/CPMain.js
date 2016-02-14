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
        if (!this.parentDom) this.getParentDom();
        var cWrapper=document.createElement('div');
        cWrapper.classList.add('cp-wrapper');
        this.parentDom.appendChild(cWrapper);
        console.log(this.parentDom);
    }


}

'use strict';
class CPlayer{
    constructor(option) {
        this.selector = option.selector || "#CPlayer";
        this.createDom();
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
        console.log(this.parentDom);
    };

    createDom(){
        if (!this.parentDom) this.getParentDom();
        var cWrapper=document.createElement('div');
        cWrapper.classList.add('cp-wrapper');
        this.parentDom.appendChild(cWrapper);
        console.log(this.parentDom);
    }


}

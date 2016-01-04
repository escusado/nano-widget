'use strict';

class NanoNodeSupport {
  appendChild (child) {
    if(child.parent) {
      child.parent.removeChild(child);
    }

    if(!this.hasOwnProperty('children')) {
      this.children = [];
    }

    this.children.push(child);
    if(child.name){
      this[child.name] = child;
    }
    child.setParent(this);
    return child;
  }

  removeChild (child) {
    let position = this.children.indexOf(child);

    if (position !== -1) {
      this.children.splice(position, 1);
      delete this[child.name];
      child.parent = null;
    }

    return child;
  }

  setParent (parent) {
    this.parent = parent;
    return this;
  }

  destroyChildren (){
    if (this.children){
      childrenLength = this.children.length;
      while(childrenLength > 0){
        this.children[0].destroyChildren();
        if (this.children.length === childrenLength) {
          this.children.shift();
        }
        childrenLength--;
      }
    }
    this.children = null;
    return this;
  }
}

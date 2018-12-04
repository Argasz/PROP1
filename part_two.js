createClass = function(className, superClassList){
    theClass = {
        className : className,
        superClassList : superClassList,
        getFunction : function(funcName){
            if(this.hasOwnProperty(funcName)){
                return this[funcName];
            }else{
                for(let c in this.superClassList){
                    let returnVal = this.superClassList[c].getFunction(funcName);
                    if(returnVal){
                        return returnVal;
                    }
                }
                return null;
            }
        },
        new : function(){
            instance = {
                call : function(funcName, parameters){
                    if(this.hasOwnProperty(funcName)){
                        return this[funcName].apply(null, parameters);
                    } // ??
                    if(this.Class.hasOwnProperty(funcName)){
                        let ret = this.Class[funcName].bind(this);
                        return ret.apply(null, parameters);
                    }else{
                        for(let c in this.Class.superClassList){
                            let returnVal = this.Class.superClassList[c].getFunction(funcName);
                            if(returnVal){
                                returnVal = returnVal.bind(this);
                                return returnVal.apply(null, parameters);
                            }
                        }
                        throw className + " has no property " + funcName;
                    }
                }
            };
            instance.Class = this;
            return instance;
        },
        hasSuper : function(superclass) {
            if (this.superClassList.includes(superclass)) {
                return true
            } else {
                for (let i = 0; i < this.superClassList.length; i++) {
                    let hasProto = this.superClassList[i].hasSuper(superclass);
                    if (hasProto) {
                        return true;
                    }
                }
                return false;
            }
        },
        addSuperClass : function(superclass){
            if(superclass.hasSuper(this)){
                throw "Circular inheritance."
            }else{
                this.superClassList.push(superclass);
            }
        }
    };

    return theClass;
};

var class0 = createClass("Class 0", null);
var class1 = createClass("Class 1", [class0]);
class0.addSuperClass(class1);

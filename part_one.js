/*
 *  Aron Gassilewski | arga1535@student.su.se
 *   Emanuel Fuetsch  | emfu2071@student.su.se
 *
 */

myObject = {
    create : function(prototypeList){
        let protoList = prototypeList;
        if(!protoList) {
            protoList = [];
        }

        let ret = {};
        for (let key in this){
            ret[key] = this[key];
        }
        ret.protoList = protoList;
        return ret;
    },
    call : function(funcName, parameters){
        if(this.hasOwnProperty(funcName)){
            if(parameters === undefined || parameters.length === 0){
                return this[funcName]();
            }else{
                return this[funcName].apply(null, parameters);
            }
        }else{
            for (i = 0; i < this.protoList.length; i++) {
                let returnVal = this.protoList[i]._superCall(funcName);
                if (returnVal) {
                    returnVal = returnVal.bind(this);
                    if(parameters === undefined || parameters.length === 0){
                        return returnVal();
                    }else{
                        return returnVal.apply(null, parameters);
                    }
                }
            }
            throw this.constructor.name + " has no property " + funcName + ".";
        }
    },
    _superCall : function(funcName){
        if(this.hasOwnProperty(funcName)){
            return this[funcName];
        }else{
            for (let i = 0; i < this.protoList.length; i++) {
                let returnVal = this.protoList[i]._superCall(funcName);
                if (returnVal) {
                    return returnVal;
                }
            }
            return null;
        }
    },
    addPrototype : function(proto){
        if(proto.hasProto(this)){
            throw "Circular inheritance."
        }else {
            this.protoList.push(proto);
        }
    },
    hasProto : function(obj){
        if(this.protoList.includes(obj)){
            return true;
        }else{
            for(i = 0; i < this.protoList.length; i++){
                let hasProto = this.protoList[i].hasProto(obj);
                if(hasProto){
                    return true;
                }
            }
            return false;
        }
    }
};


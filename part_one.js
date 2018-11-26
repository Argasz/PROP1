myObject = {
    create : function(prototypeList){
        var protoList = prototypeList;
        if(!protoList){
            protoList = [];
        }
        return {protoList : protoList,
            call : this.call,
            create : this.create,
            addPrototype : this.addPrototype,
            hasProto : this.hasProto,
            _superCall : this._superCall}
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
                var returnVal = this.protoList[i]._superCall(funcName, parameters);
                if (returnVal) {
                    return returnVal;
                }
            }
            throw this.constructor.name + " has no property " + funcName + ".";
        }
    },
    _superCall : function(funcName, parameters){
        if(this.hasOwnProperty(funcName)){
            if(parameters === undefined || parameters.length === 0){
                return this[funcName]();
            }else{
                return this[funcName].apply(null, parameters);
            }
        }else{
            for (i = 0; i < this.protoList.length; i++) {
                var returnVal = this.protoList[i]._superCall(funcName, parameters);
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
        }
        if(typeof proto === "object"){
            this.protoList.push(proto);
        }else{
            throw "Prototype must be of type object."
        }
    },
    hasProto : function(obj){
        if(this.protoList.includes(obj)){
            return true;
        }else{
            for(i = 0; i < this.protoList.length; i++){
                var hasProto = this.protoList[i].hasProto(obj);
                if(hasProto){
                    return true;
                }
            }
            return false;
        }
    }

};



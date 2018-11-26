myObject = {
    create : function(prototypeList){
        var protoList = prototypeList;
        if(!protoList) {
            protoList = [];
        }

        var ret = {};
        for (var key in this){
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
                var returnVal = this.protoList[i]._superCall(funcName);
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
            for (i = 0; i < this.protoList.length; i++) {
                var returnVal = this.protoList[i]._superCall(funcName);
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

var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"])  ;
console.log("should print ’func0: hello’ ->", result);



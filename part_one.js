myObject = {
    create : function(prototypeList){
        return {protoList : prototypeList,
                call : this.call,
                create : this.create}
    },
    call : function(funcName, parameters){
        if(this.hasOwnProperty(funcName)){
            if(parameters === undefined || parameters.length === 0){
                return this[funcName]();
            }else{
                return this[funcName].apply(null, parameters);
            }
        }else{
            for(var i = 0; i < this.protoList.length; i++){
                var returnVal = this.protoList[i].call(funcName, parameters);
                if(returnVal){
                    return returnVal;
                }
            }
            throw "No function with the name " + funcName + "was found.";
        }
    }

};


var o1 = myObject.create([]);
o1.func = function(arg){return "func0: " + arg; };

var o2 = myObject.create([o1]);
o2.func2 = function(arg){return "func1: " + arg; };

var o3 = myObject.create([o2]);


console.log(o3.call("func", ["Hi"]));


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
                    if(this.Class.hasOwnProperty(funcName)){
                        return this.Class[funcName].apply(null, parameters);
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
        }
    };

    return theClass;
};

class0 = createClass("Class0", null);
class0.name = "A";
class0.func = function(arg) { return "func0: " + arg + this.name; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log(result);
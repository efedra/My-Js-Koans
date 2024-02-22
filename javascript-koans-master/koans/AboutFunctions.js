describe("About Functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue)
    {
      var newFunction = function doMysteriousThing(param)
      {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3);
    var mysteryFunction5 = makeMysteryFunction(5);

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
    //Вместо FILL_ME_IN нужно вставить значение 23.
    //
    // Код создает функцию makeMysteryFunction, которая принимает один аргумент makerValue. Внутри функции создается новая функция doMysteriousThing, которая принимает один аргумент param. Возвращаемое значение этой функции - сумма makerValue и param.
    //
    // Затем, код создает две новые функции mysteryFunction3 и mysteryFunction5, вызывая makeMysteryFunction с разными аргументами (3 и 5).
    //
    // После этого, код вычисляет сумму mysteryFunction3(10) (которая равна 3 + 10 = 13) и mysteryFunction5(5) (которая равна 5 + 5 = 10) и ожидает, что сумма этих двух значений будет равна 18.


    //Когда вы вызываете makeMysteryFunction(3), создается новая функция newFunction, которая сохраняет значение makerValue
    // (в данном случае 3) в своем лексическом окружении. Затем эта функция возвращается из makeMysteryFunction и сохраняется
    // в переменной mysteryFunction3.
    //Когда вы вызываете mysteryFunction3(10), значение 10 передается внутрь функции newFunction в качестве значения param.
    // В этот момент функция newFunction может использовать как значение makerValue (которое было сохранено при создании функции),
    // так и значение param (которое было передано при вызове функции).
    //Таким образом, при вызове mysteryFunction3(10) функция newFunction будет иметь доступ к значениям makerValue (которое равно 3)
    // и param (которое равно 10). Она может использовать эти значения в своем теле функции для выполнения определенных действий.
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }


    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(","); // в строчку превращает
    }
    //????????/!!!!!!!
    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  it("should pass functions as values", function () {

    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");

  });
});

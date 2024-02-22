describe("About Mutability", function () {

    it("should expect object properties to be public and mutable", function () {
        var aPerson = {firstname: "John", lastname: "Smith"};
        aPerson.firstname = "Alan";

        expect(aPerson.firstname).toBe("Alan");
    });

    it("should understand that constructed properties are public and mutable", function () {
        function Person(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;
        }

        var aPerson = new Person("John", "Smith");
        aPerson.firstname = "Alan";

        expect(aPerson.firstname).toBe("Alan");
    });

    it("should expect prototype properties to be public and mutable", function () {
        function Person(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;
        }

        Person.prototype.getFullName = function () {
            return this.firstname + " " + this.lastname;
        };

        var aPerson = new Person("John", "Smith");
        expect(aPerson.getFullName()).toBe("John Smith");

        aPerson.getFullName = function () {
            return this.lastname + ", " + this.firstname;
        };

        expect(aPerson.getFullName()).toBe("Smith, John");
    });

    it("should know that variables inside a constructor and constructor args are private", function () {
        function Person(firstname, lastname) {
            var fullName = firstname + " " + lastname;

            this.getFirstName = function () {
                return firstname;
            };
            this.getLastName = function () {
                return lastname;
            };
            this.getFullName = function () {
                return fullName;
            };
        }

        var aPerson = new Person("John", "Smith");

        aPerson.firstname = "Penny";
        aPerson.lastname = "Andrews";
        aPerson.fullName = "Penny Andrews";

        expect(aPerson.getFirstName()).toBe("John");
        expect(aPerson.getLastName()).toBe("Smith");
        expect(aPerson.getFullName()).toBe("John Smith");

        /* Функция Person является конструктором, потому что она используется для создания новых объектов с определенным набором
        свойств и методов. Конструкторы в JavaScript используются для создания объектов, которые имеют общие свойства и методы.

    В данном случае, конструктор Person создает объекты, у которых есть два приватных поля firstname и lastname. Эти поля являются
     приватными, потому что они объявлены внутри замыкания - функции Person.

    Замыкание - это комбинация функции и лексического окружения, в котором эта функция была объявлена. В данном случае, замыкание
     функции Person сохраняет значения firstname и lastname в локальных переменных, доступных только внутри этого замыкания. Таким образом, эти переменные становятся приватными для объектов, созданных с помощью конструктора Person.

    Приватные поля позволяют скрыть определенные данные от внешнего доступа и контролировать их использование через публичные
     методы. В данном случае, публичные методы getFirstName() и getLastName() позволяют получить значения приватных полей
     firstname и lastname, но не изменить их напрямую. Это помогает обеспечить инкапсуляцию и защиту данных от нежелательного изменения.

Функция Person не возвращает никакого значения явно, но она используется с оператором new, который выполняет следующие действия:

1. Создает новый пустой объект.
2. Устанавливает этот новый объект в качестве значения this для функции Person.
3. Привязывает прототип нового объекта к прототипу функции Person.
4. Выполняет код функции Person, который инициализирует свойства и методы нового объекта.
5. Возвращает созданный объект.

Таким образом, при использовании функции Person с оператором new, она создает новый объект и инициализирует его свойства и методы.


Комбинация функции и лексического окружения означает, что функция сохраняет ссылку на окружение, в котором она была объявлена.
В данном случае, функция Person сохраняет ссылку на окружение, в котором были объявлены переменные firstname и lastname.
Это позволяет функции Person получить доступ к этим переменным даже после того, как они вышли из области видимости.

Параметры firstname и lastname становятся приватными благодаря замыканию. Когда функция Person создается, она сохраняет
значения параметров firstname и lastname в локальных переменных своего замыкания. Эти переменные остаются доступными только
внутри замыкания и не могут быть изменены напрямую извне. Таким образом, они становятся приватными для объектов, созданных с
помощью конструктора Person.

     */

        aPerson.getFullName = function () {
            return aPerson.lastname + ", " + aPerson.firstname;
        };

        expect(aPerson.getFullName()).toBe("Andrews, Penny");
    });

});

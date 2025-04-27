# Java8特性

**目录**

[[toc]]

## Stream

### 一般方法

```java
List<Person> list = new ArrayList<>();
list.add(new Person("jack", 20));
list.add(new Person("mike", 25));
list.add(new Person("tom", 30));
```

```java
private String name;
private int age;
```

#### 1. stream() / parallelStream()

parallelStream() 是并行流方法，能够让数据集执行并行操作

```java
List list = new ArrayList();
// return Stream<E>
list.stream();
```

#### 2. filter(T -> boolean)

保留 boolean 为 true 的元素

```java
保留年龄为 20 的 person 元素
list = list.stream()
            .filter(person -> person.getAge() == 20)
            .collect(toList());

打印输出 [Person{name='jack', age=20}]
```

#### 3. distinct()

去除重复元素，这个方法是通过类的 equals 方法来判断两个元素是否相等的

#### 4. sorted() / sorted((T, T) -> int)

如果流中的元素的类实现了 Comparable 接口，即有自己的排序规则，那么可以直接调用 sorted() 方法对元素进行排序，如 Stream；反之,
需要调用 sorted((T, T) -> int) 实现 Comparator 接口

```java
// 根据年龄大小来比较：
list = list.stream()
           .sorted((p1, p2) -> p1.getAge() - p2.getAge())
           .collect(toList());
```

简化

```java
list = list.stream()
           .sorted(Comparator.comparingInt(Person::getAge))
           .collect(toList());
```

#### 5. limit(long n)

返回前 n 个元素

```java
list = list.stream()
            .limit(2)
            .collect(toList());

// 打印输出 [Person{name='jack', age=20}, Person{name='mike', age=25}]
```

#### 6. skip(long n)

去除前 n 个元素

```java
list = list.stream()
            .skip(2)
            .collect(toList());

// 打印输出 [Person{name='tom', age=30}]
```

##### tips

- 用在 limit(n) 前面时，先去除前 m 个元素再返回剩余元素的前 n 个元素
- limit(n) 用在 skip(m) 前面时，先返回前 n 个元素再在剩余的 n 个元素中去除 m 个元素

```java
list = list.stream()
            .limit(2)
            .skip(1)
            .collect(toList());

// 打印输出 [Person{name='mike', age=25}]
```

#### 7. map(T -> R)

将流中的每一个元素 T 映射为 R（类似类型转换）

```java
List<String> newlist = list.stream().map(Person::getName).collect(toList());
```

#### 8. flatMap(T -> Stream)

将流中的每一个元素 T 映射为一个流，再把每一个流连接成为一个流

```java
List<String> list = new ArrayList<>();
list.add("aaa bbb ccc");
list.add("ddd eee fff");
list.add("ggg hhh iii");

// 把 List 中每个字符串元素以" "分割开，变成一个新的 List
list = list.stream().map(s -> s.split(" ")).flatMap(Arrays::stream).collect(toList());
```

#### 9. anyMatch(T -> boolean)

流中是否有一个元素匹配给定的 T -> boolean 条件

```java
是否存在一个 person 对象的 age 等于 20：
boolean b = list.stream().anyMatch(person -> person.getAge() == 20);
```

#### 10. allMatch(T -> boolean)

流中是否所有元素都匹配给定的 T -> boolean 条件

#### 11. noneMatch(T -> boolean)

流中是否没有元素匹配给定的 T -> boolean 条件

#### 12. findAny() 和 findFirst()

- findAny()：找到其中一个元素 （使用 stream() 时找到的是第一个元素；使用 parallelStream() 并行时找到的是其中一个元素）
- findFirst()：找到第一个元素

#### 13. reduce((T, T) -> T) 和 reduce(T, (T, T) -> T)

用于组合流中的元素，如求和，求积，求最大值等

```java
// 计算年龄总和：
int sum = list.stream().map(Person::getAge).reduce(0, (a, b) -> a + b);
// 与之相同:
int sum = list.stream().map(Person::getAge).reduce(0, Integer::sum);
```

其中，reduce 第一个参数 0 代表起始值为 0，lambda (a, b) -> a + b 即将两值相加产生一个新值`<br />`同样地：

```java
// 计算年龄总乘积：
int sum = list.stream().map(Person::getAge).reduce(1, (a, b) -> a * b);
```

当然也可以

```java
Optional<Integer> sum = list.stream().map(Person::getAge).reduce(Integer::sum);
```

即不接受任何起始值，但因为没有初始值，需要考虑结果可能不存在的情况，因此返回的是 Optional 类型

#### 13. count()

返回流中元素个数，结果为 long 类型

#### 14. collect()

收集方法，我们很常用的是 collect(toList())，当然还有 collect(toSet()) 等，参数是一个收集器接口，这个后面会另外讲

#### 15. forEach()

返回结果为 void，很明显我们可以通过它来干什么了

```java
// 打印各个元素：
list.stream().forEach(System.out::println);
```

#### 16. unordered()

返回一个等效的无序流，当然如果流本身就是无序的话，那可能就会直接返回其本身

### 数值流

#### 1. 流与数值流的转换

##### 流转换为数值流

- mapToInt(T -> int) : return IntStream
- mapToDouble(T -> double) : return DoubleStream
- mapToLong(T -> long) : return LongStream

```java
IntStream intStream = list.stream().mapToInt(Person::getAge);
```

##### 数值流转换为流

```java
Stream<Integer> stream = intStream.boxed();
```

#### 2. 数值流方法

- sum()
- max()
- min()
- average()

#### 3. 数值范围

IntStream 与 LongStream 拥有 range 和 rangeClosed 方法用于数值范围处理

- IntStream ： rangeClosed(int, int) / range(int, int)
- LongStream ： rangeClosed(long, long) / range(long, long)

这两个方法的区别在于一个是闭区间，一个是半开半闭区间：

- rangeClosed(1, 100) ：[1, 100]
- range(1, 100) ：[1, 100)

利用 IntStream.rangeClosed(1, 100) 生成 1 到 100 的数值流

```java
求 1 到 10 的数值总和：
IntStream intStream = IntStream.rangeClosed(1, 10);
int sum = intStream.sum();
```

### 构建流

#### 1. 值创建流

- Stream.of(T...) ： Stream.of("aa", "bb") 生成流

```java
生成一个字符串流
Stream<String> stream = Stream.of("aaa", "bbb", "ccc");
```

- Stream.empty() : 生成空流

#### 2. 数组创建流

根据参数的数组类型创建对应的流：

- Arrays.stream(T[ ])
- Arrays.stream(int[ ])
- Arrays.stream(double[ ])
- Arrays.stream(long[ ])

规定只取数组的某部分，用到的是Arrays.stream(T[], int, int)

```java
// 只取索引第 1 到第 2 位的：
int[] a = {1, 2, 3, 4};
Arrays.stream(a, 1, 3).forEach(System.out :: println);

// 打印 2 ，3
```

#### 3. 文件生成流

```java
// 每个元素是给定文件的其中一行
Stream<String> stream = Files.lines(Paths.get("data.txt"));
```

#### 4. 函数生成流

两个方法：

- iterate ： 依次对每个新生成的值应用函数
- generate ：接受一个函数，生成一个新的值

```java
// 生成流，首元素为 0，之后依次加 2
Stream.iterate(0, n -> n + 2)

// 生成流，为 0 到 1 的随机双精度数
Stream.generate(Math :: random)

// 生成流，元素全为 1
Stream.generate(() -> 1)
```

### collect 收集数据

coollect 方法作为终端操作，接受的是一个 Collector 接口参数，能对数据进行一些收集归总操作

#### 1. 收集

最常用的方法，把流中所有元素收集到一个 List, Set 或 Collection 中

- toList
- toSet
- toCollection

```java
List newlist = list.stream.collect(toList());
```

#### 2. 汇总

##### （1）counting

用于计算总和：

```java
long l = list.stream().collect(counting());
```

等同于

```java
long l = list.stream().count();
```

##### （2）summingInt ，summingLong ，summingDouble

计算 Person 年龄总和：

```java
int sum = list.stream().collect(summingInt(Person::getAge));
```

简化：

```java
int sum = list.stream().mapToInt(Person::getAge).sum();
```

等同于：

```java
int sum = list.stream().map(Person::getAge).reduce(Interger::sum).get();
```

##### （3）averagingInt，averagingLong，averagingDouble

求平均数

```java
Double average = list.stream().collect(averagingInt(Person::getAge));
```

等同于

```java
OptionalDouble average = list.stream().mapToInt(Person::getAge).average();
```

##### （4）summarizingInt，summarizingLong，summarizingDouble

```java
IntSummaryStatistics l = list.stream().collect(summarizingInt(Person::getAge));
```

IntSummaryStatistics 包含了计算出来的平均值，总数，总和，最值，可以通过下面这些方法获得相应的数据

- getAvrage()
- getCount()
- getMax()
- getMin()
- getSum()

#### 3. 取最值

maxBy，minBy 两个方法，需要一个 Comparator 接口作为参数

```java
Optional<Person> optional = list.stream().collect(maxBy(comparing(Person::getAge)));
```

等同于：

```java
Optional<Person> optional = list.stream().max(comparing(Person::getAge));
```

#### 4. joining 连接字符串

对流里面的字符串元素进行连接，**其底层实现用的是专门用于字符串连接的 StringBuilder**

```java
String s = list.stream().map(Person::getName).collect(joining());
// 结果：jackmiketom

String s = list.stream().map(Person::getName).collect(joining(","));
// 结果：jack,mike,tom

String s = list.stream().map(Person::getName).collect(joining(" and ", "Today ", " play games."));
// 结果：Today jack and mike and tom play games. 
// 即 Today 放开头，play games. 放结尾，and 在中间连接各个字符串
```

#### 5. groupingBy 分组

groupingBy 用于将数据分组，最终返回一个 Map 类型。

```java
// 每一个 Person 对象中年龄相同的归为一组
Map<Integer, List<Person>> map = list.stream().collect(groupingBy(Person::getAge));
```

##### 多级分组

groupingBy 可以接受一个第二参数实现多级分组：

```java
Map<Integer, Map<T, List<Person>>> map = list.stream().collect(groupingBy(Person::getAge, groupBy(...)));
```

##### 按组收集数据

```java
Map<Integer, Integer> map = list.stream().collect(groupingBy(Person::getAge, summingInt(Person::getAge)));
```

#### 6. partitioningBy 分区

分区与分组的区别在于，分区是按照 true 和 false 来分的，因此partitioningBy 接受的参数的 lambda 也是 T -> boolean

```java
// 根据年龄是否小于等于20来分区
Map<Boolean, List<Person>> map = list.stream()
                                     .collect(partitioningBy(p -> p.getAge() <= 20));

打印输出
{
    false=[Person{name='mike', age=25}, Person{name='tom', age=30}], 
    true=[Person{name='jack', age=20}]
}
```

## Optional

Optional 是一个容器对象，该容器里可能包含非空值也可能不包含非空值。最主要的用途就是为了规避 NPE 异常（传入的对象为 null
造成）。

### 类源码

```java
public final class Optional<T> {
    private static final Optional<?> EMPTY = new Optional<>();

    private final T value;

    private Optional() {
        this.value = null;
    }

    public static<T> Optional<T> empty() {
        @SuppressWarnings("unchecked")
        Optional<T> t = (Optional<T>) EMPTY;
        return t;
    }

    private Optional(T value) {
        this.value = Objects.requireNonNull(value);
    }

    public static <T> Optional<T> of(T value) {
        return new Optional<>(value);
    }

    public static <T> Optional<T> ofNullable(T value) {
        return value == null ? empty() : of(value);
    }

    public T get() {
        if (value == null) {
            throw new NoSuchElementException("No value present");
        }
        return value;
    }

    public boolean isPresent() {
        return value != null;
    }

    public void ifPresent(Consumer<? super T> consumer) {
        if (value != null)
            consumer.accept(value);
    }

    public Optional<T> filter(Predicate<? super T> predicate) {
        Objects.requireNonNull(predicate);
        if (!isPresent())
            return this;
        else
            return predicate.test(value) ? this : empty();
    }

    public<U> Optional<U> map(Function<? super T, ? extends U> mapper) {
        Objects.requireNonNull(mapper);
        if (!isPresent())
            return empty();
        else {
            return Optional.ofNullable(mapper.apply(value));
        }
    }

    public<U> Optional<U> flatMap(Function<? super T, Optional<U>> mapper) {
        Objects.requireNonNull(mapper);
        if (!isPresent())
            return empty();
        else {
            return Objects.requireNonNull(mapper.apply(value));
        }
    }

    public T orElse(T other) {
        return value != null ? value : other;
    }

    public T orElseGet(Supplier<? extends T> other) {
        return value != null ? value : other.get();
    }

    public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
        if (value != null) {
            return value;
        } else {
            throw exceptionSupplier.get();
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Optional)) {
            return false;
        }

        Optional<?> other = (Optional<?>) obj;
        return Objects.equals(value, other.value);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }

    @Override
    public String toString() {
        return value != null
            ? String.format("Optional[%s]", value)
            : "Optional.empty";
    }
}

```

### 构造方法

```java
private Optional(T value) {
    this.value = Objects.requireNonNull(value);
}
```

- Optional 是一个容器，容器里面包着一个值，这个值是泛型
- 因为构造方法私有化，所以不能通过 new 新建 Optional 对象，只能通过静态工厂方法构造对象

### 创建 Optional 对象方法

- of：返回一个容器的值不为 null 的对象，使用该方法要求调用者调用 of 方法时，参数值不为空，否则会抛出 NPE 异常
- ofNullable：构造一个可能为空，也可能不为空的 optional 对象
- empty：返回容器的值为 null 的对象

### 常用方法和理解

- isPresent()：判断该对象是否存在，存在时返回 true，反之 flase
- get()：返回当前值，若值不存在会抛出异常
- orElse：容器值不为空，返回value；为空，返回指定值
- orElseGet：不接受参数，容器值不为空，返回 value；为空，返回指定值
- orElseThrow：容器值不为空，返回 value；为空，抛出异常
- map：映射，将一个值映射成另一个值。如果有值，则对其执行调用映射函数得到返回值。如果返回值不为 null ，则创建包含映射返回值的
  Optional 作为 map 方法返回值，否则返回空 Optional

### 使用注意

- Optional 无法被序列化。不能将 Optional 作为方法参数进行定义，也不能在类当中声明 Optional 类型的成员变量。
- Optional 通常只作为方法的返回值，用来规避空指针异常。

### orElse、orElseGet区别

- orElseGet()方法在我们检查Optional对象不为空的时候，就不再调用getMyDefault这个方法
- orElse()方法，尽管Optional对象不为空，但是orElse()方法中调用的方法还是被执行了一次

```java
@Slf4j
public class OptionalTest {
    @Test
    public void orElseNullTest() {
        String text = null;

        String defaultText = Optional.ofNullable(text).orElseGet(this::getMyDefault); // 输出内容：Getting Default Value
        assertEquals("Default Value", defaultText);

        defaultText = Optional.ofNullable(text).orElse(getMyDefault()); // 输出内容：Getting Default Value
        assertEquals("Default Value", defaultText);
    }
   
    @Test
    public void orElseNotNullTest() {
        String text = "Text present";
        log.info("Using orElseGet:"); //输出内容： Using orElseGet:
        String defaultText = Optional.ofNullable(text).orElseGet(this::getMyDefault);
        assertEquals("Text present", defaultText);

        log.info("Using orElse:"); //输出内容： Using orElse:
        defaultText = Optional.ofNullable(text).orElse(getMyDefault()); //输出内容：Getting Default Value
        assertEquals("Text present", defaultText);
    }

    public String getMyDefault() {
        System.out.println("Getting Default Value");
        return "Default Value";
    }
}
```

## 函数式接口

| 函数式接口               | 函数描述符              |
|---------------------|--------------------|
| Predicate           | (T)  -> boolean    |
| Consumer            | (T)  -> void       |
| Function< T, R >    | (T)  -> R          |
| Supplier            | ( )  -> T          |
| UnaryOperator       | (T)  ->  T         |
| BinaryOperator      | (T, T) -> T        |
| BiPredicate<L, R>   | (L, R)  -> boolean |
| BiConsumer<T, U>    | (T, U)  -> void    |
| BiFunction<T, U, R> | (T, U)  -> R       |

### Consumer  消费型接口

#### 接口源码

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

#### 理解

Consumer表示一个操作，接受单个输入参数且不返回任何结果；在stream里，主要是用于forEach；内部迭代的时候，对传入的参数，做一系列的业务操作，没有返回值。

#### 示例

```java
public void happy(double money,Consumer<Double> con){
    con.accept(money);
}

public void test(){
    happy(1000, m -> System.out.print("消费"+m+"元"));
}
```

### Supplier  供给型接口

#### 接口源码

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
} 
```

#### 理解

get()方法不接受任何参数，只返回通用类型的值。

#### 示例

```java
public static List<Integer> getNumList(int num,Supplier<Integer> sup){
    List<Integer> list = new ArrayList<>();
    for(int i = 0; i < num;i++){
        list.add(sup.get());
    }
    System.out.println(list.toString());
    return list;
}

public static void supplierTest(){
    List<Integer> list  = getNumList(10, () -> (int) NumberUtil.generateRandomNumber(1,10,2)[0]);
}
```

### Function<T, R>  函数型接口

#### 接口源码

```java
@FunctionalInterface
public interface Function<T, R> {
    /**
     * 将参数赋予给相应方法
     *
     * @param t
     * @return
     */
    R apply(T t);

    /**
     * 先执行参数(即也是一个Function)的，再执行调用者(同样是一个Function)
     */
    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    /**
     * 先执行调用者，再执行参数，和compose相反。
     */
    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    /**
     * 返回当前正在执行的方法
     */
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

#### 1. Function apply

示例 1：输入一个字符串 `<T>` String， 返回字符串的大写形式 `<R>` String。

```java
    @Test
    public void testApply(){
        Function<String, String> toUpperCase = String::toUpperCase;
        String result = toUpperCase.apply("function.apply");
        System.out.println(result);
        Assert.assertEquals("FUNCTION.APPLY", result);
    }
```

示例2：输入一个字符串`<T>`String ，返回字符串长度`<R>`Integer

```java
    @Test
    public void testApply2(){
        Function<String, Integer> lengthFunction = String::length;
        Integer length = lengthFunction.apply("function.apply");
        System.out.println(length);
        Assert.assertEquals(14, (int) length);
    }
```

#### 2. Function andThen

Function 函数接口的 andThen() 方法可以让多个 Function 函数连接使用。`<br />`示例：输入一个字符串，获取字符串长度，然后乘以2

```java
    @Test
    public void testAndThen() {
        String s = "function.apply";
        Function<String, Integer> lengthFunction = String::length;
        Function<Integer, Integer> doubleFunction = length -> length * 2;
        Integer doubleLength = lengthFunction.andThen(doubleFunction).apply(s);
        System.out.println(doubleLength);
        Assert.assertEquals(28, (int) doubleLength);
        // 过程
        int len = lengthFunction.apply(s);
        System.out.println(len);
        int result = doubleFunction.apply(len);
        System.out.println(result);
        Assert.assertEquals(result, (int) doubleLength);
    }
```

#### 3. Function identity

Function.identity() 返回一个输出跟输入一样的Lambda表达式对象，等价于形如t -> t形式的Lambda表达式。

```java
    @Test
    public void testIdentity() {
        Function<String, String> func = Function.identity();
        String s = "Function.identity";
        String result = func.apply(s);
        System.out.println(result);
        Assert.assertEquals(s, result);
    }
```

#### 4. Function Compose

```java
    @Test
    public void testCompose() {
        Function<Integer, Integer> func = i -> i * 2;
        Function<Integer, Integer> func1 = i -> i * i;
        Integer iCompose = func.compose(func1).apply(2);
        Integer iAndThen = func1.andThen(func).apply(2);
        Integer jCompose = func1.compose(func).apply(2);
        Integer jAndThen = func.andThen(func1).apply(2);
        System.out.println(iCompose);
        System.out.println(iAndThen);
        System.out.println(jCompose);
        System.out.println(jAndThen);
        Assert.assertEquals(8, (int) iCompose);
        Assert.assertEquals(8, (int) iAndThen);
        Assert.assertEquals(16, (int) jCompose);
        Assert.assertEquals(16, (int) jAndThen);
    }
```

### Predicate  断言型接口

#### 接口源码

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

#### 理解

返回布尔类型（boolean），常用于stream的filter、anyMatch、anyMatch、allMatch。

#### 示例

```java
public static List<String> filterStr(List<String> strList ,Predicate<String> per){
    List<String> result = new ArrayList<>();
    for(String s : strList){
        if(per.test(s)){
            result.add(s);
        }
    }
    return result;
}

public static void predicateTest(){
    List<String> strs= Arrays.asList("hello","world");
    List<String> result= filterStr(strs, s -> s.length() >3 );
}
```

## Java8常用示例

### List 祛重复

去掉重复项，获得新list

```java
//根据userid去重
userList = userList.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(User :: getUserid))), ArrayList::new));
```

获取重复的项，返回map

```java
// 重复数据 -- 协议年度、机构编号、基金支付类别等数据一致视为重复数据
Map<String, List<YearendClrAdjmEvtCDTO>> reptMap = yearEndClrCrtfDDTOSSuccess.stream().collect(Collectors.groupingBy(dto -> dto.getYear() + "_" + dto.getFixmedinsCode() + "_"+ dto.getFundPayType()));
        reptMap.forEach((k,v)->{
            if(v.size()>1){
                yearEndClrCrtfDDTOSSuccess.removeAll(v);
                v.forEach(vdto->{
                    vdto.setMsg("导入的excel中有重复数据（协议年度、机构编号、基金支付类别等数据一致视为重复数据）！");
                    yearEndClrCrtfDDTOSFail.add(vdto);
                });
            }
        });
```

### List to Map

```java
staElemAppBDTOS.stream().collect(Collectors.toMap(StaElemAppBDTO::getStaElemCodg,StaElemAppBDTO::getStaElemName));
```

**注意：** `Collectors.toMap`的 value 值也不能为空，具体如源码所示

```java
default V merge(K key, V value,
        BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
    Objects.requireNonNull(remappingFunction);
    Objects.requireNonNull(value);
    V oldValue = get(key);
    V newValue = (oldValue == null) ? value :
               remappingFunction.apply(oldValue, value);
    if(newValue == null) {
        remove(key);
    } else {
        put(key, newValue);
    }
    return newValue;
}
```

### Collectors.groupingBy

```java
Map<String,List<String>> map = dtos.stream().collect(Collectors.groupingBy(Dto::getCode, Collectors.mapping(Dto::getType,Collectors.toList())));
```

### 多字段排序

```java
 /**
 * 排序 、多条件排序,注意事项，排序的字段不能为空
 */
@Test
public void comparator() {

    /**
     *
     * 手动控制排序（复杂业务的时候，可以采用该种方法）
     * 1、年龄倒叙
     * 2、id 升序
     *
     */
    Comparator<Users> usersComparator = Comparator.comparing(Users::getAge, (o1, o2) -> {
        //  倒叙
        return o2.compareTo(o1);
    }).thenComparing(Users::getId, (o1, o2) -> {
        // 升序
        return o1.compareTo(o2);
    });
    List<Users> collect = users.stream().sorted(usersComparator).collect(Collectors.toList());

    collect.forEach(item -> {
        System.out.println(item);
    });

    System.out.println("----------------------------------");

    /**
     *
     * 第二种排倒序方法
     * Comparator.reverseOrder 倒叙
     * Comparator.naturalOrder 升叙
     *
     * 1、年龄倒叙
     * 2、id 倒序
     *
     */
    Comparator<Users> usersComparator2 = Comparator.comparing(Users::getAge, Comparator.reverseOrder()).thenComparing(Users::getId,Comparator.reverseOrder());
    List<Users> collect2 = users.stream().sorted(usersComparator2).collect(Collectors.toList());

    collect2.forEach(item -> {
        System.out.println(item);
    });

}
```

### List 根据多个相同字段合并List

```java
List<DpstFundSbitDDTO> dpstSbits = dpstFundSbitDDTOS.stream().collect(
                Collectors.groupingBy(dto -> String.join("|", dto.getFundPayType(), dto.getPoolareaFundPayType(), dto.getFeeClrId()))
        ).values().stream().flatMap(sbits -> Stream.of(sbits.stream().reduce((d1, d2) -> {
            d1.setDpst(NumberUtil.add(d1.getDpst(), d2.getDpst()));
            d1.setDpstId(dpstId);
            return d1;
        }).orElse(new DpstFundSbitDDTO()))).collect(Collectors.toList());
```

### List 多个相同结构的List`<List>`合并成List

```java
 monsetlProcDTOS.stream().map(MonsetlProcDTO::getClrProcFundDDTOS).flatMap(Collection::stream).collect(Collectors.toList());
```

# StopWatch耗时统计

spring提供的一个耗时统计工具类

```java
@Test
public void stopWatch() throws InterruptedException {
    StopWatch stopWatch = new StopWatch("耗时统计");
    stopWatch.start("开始");
    Thread.sleep(100);
    stopWatch.stop();
    stopWatch.start("运行中");
    Thread.sleep(200);
    stopWatch.stop();
    stopWatch.start("测试运行中");
    Thread.sleep(300);
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());
}
```

输出结果

```text
StopWatch '耗时统计': running time = 627591900 ns
---------------------------------------------
ns         %     Task name
---------------------------------------------
108536700  017%  开始
205229500  033%  运行中
313825700  050%  测试运行中
```

# ThreadLocal
>   ThreadLocal是当前线程的本地变量，在线程Thread的声明周期内起作用，可以用于一个线程内多个方法之间的一些公用变量的传递

**目录**

[[toc]]

## ThreadLocal原理

ThreadLocal使用过程如下图，每个线程Thread都有自己的一个ThreadLocalMap，ThreadLocalMap中使用Entry存放kv键值对，key是ThreadLocal实例本身，value是真正需要存储的Object。也就是说 ThreadLocal 本身并不存储值，它只是作为一个 key 来让线程从ThreadLocalMap获取value。下图中的虚线表示ThreadLocalMap是使用ThreadLocal的弱引用作为Key，弱引用对象在GC时会被回收。

<img :src="$withBase('/images/java/ThreadLocal.png')" alt="ThreadLocal">

## ThreadLocal为什么会内存泄漏

ThreadLocalMap使用ThreadLocal的弱引用作为key，如果一个ThreadLocal没有外部强引用来引用它，那么GC的时候，这个ThreadLocal将会被回收，那么ThreadLocalMap中就会出现key为null的Entry，就没有办法访问这些key为null的Entry的value，如果当前线程再迟迟不结束的话，这些key为null的Entry的value就会一直存在一条强引用链：Thread Ref-> Thread -> ThreaLocalMap -> Entry -> value，也是因为这条引用链的存在，如果线程Thread还在运行，那么Entry就一直不会被回收，进而value也不会被回收。当Thread在线程池中不断被使用后，就会造成内存泄漏。

## Thread、ThreadLocal、ThreadLocalMap关系

每个Thread内部有个ThreadLocal.ThreadLocalMap变量，ThreadLocalMap为ThreadLocal的一个静态内部类，里面定义了Entry来保存数据，Entry存放的key为ThreadLocal。

<img :src="$withBase('/images/java/ThreadLocal关系.png')" alt="ThreadLocal关系">

源码参考如下：

```java
public class Thread implements Runnable {
    public static native Thread currentThread();
    /* ThreadLocal values pertaining to this thread. This map is maintained
     * by the ThreadLocal class. */
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```

```java
public class ThreadLocal<T> {
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }
    
    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }
    
    void createMap(Thread t, T firstValue) {
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }
        
    static class ThreadLocalMap {
        static class Entry extends WeakReference<ThreadLocal<?>> {
            /** The value associated with this ThreadLocal. */
            Object value;
        
            Entry(ThreadLocal<?> k, Object v) {
                super(k);
                value = v;
            }
        }
    }
}
```

## 划重点

-   ThreadLocal在线程池中会被线程反复使用，ThreadLocal的生命周期不等于一次Request的声明周期
-   每次使用ThreadLocal完成后调用remove()方法清除数据
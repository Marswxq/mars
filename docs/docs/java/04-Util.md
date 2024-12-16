# Util

**目录**

[[toc]]

## 后台分页

```java
 /**
     * 分页
     *
     * @param pageNumber
     * @param pageSizeorElseGet
     * @param sort
     * @param order
     * @param ls
     * @param <T>
     * @return map（前台使用的分页）
     */
    public static <T> Map covertPageResult(Integer pageNumber, Integer pageSize, String sort, String order,
                                           List<T> ls) {
        Map rsMap = new HashMap(4);
        long skipLine = Math.multiplyExact(pageSize, (pageNumber - 1));
        // 排序:升序
        if (SORT_ASC.equals(sort) && StrUtil.isNotEmpty(order)) {
            ObjSort(ls, order);
        }
        // 降序
        if (SORT_DESC.equals(sort) && StrUtil.isNotEmpty(order)) {
            ObjSortReversed(ls, order);
        }
        // 分页
        List<T> pagers = ls.stream().skip(skipLine).limit(pageSize).collect(Collectors.toList());
        rsMap.put("pageNumber", pageNumber);
        rsMap.put("pageSize", pageSize);
        rsMap.put("total", ls.size());
        rsMap.put("result", pagers);
        return rsMap;
    }

    /**
     * 按照指定对象的字段排序(正序)
     *
     * @param list  对象集合
     * @param param 排序字段
     * @param <T>   对象类型
     */
    public static final <T> void ObjSort(List<T> list, String param) {
        Collections.sort(list, (o1, o2) -> {
            Class<?> type = o1.getClass();
            try {
                PropertyDescriptor descriptor = new PropertyDescriptor(param, type);
                Method readMethod = descriptor.getReadMethod();
                return readMethod.invoke(o1).toString().compareTo(readMethod.invoke(o2).toString());
            } catch (Exception e) {
                throw new AppRuntimeException("List Sort Error! " + e.getMessage());
            }
        });
    }

    /**
     * 按照指定对象的字段倒叙排序
     *
     * @param list  对象集合
     * @param param 排序字段
     * @param <T>   对象类型
     */
    public static final <T> void ObjSortReversed(List<T> list, String param) {
        ObjSort(list, param);
        Collections.reverse(list);
    }
```


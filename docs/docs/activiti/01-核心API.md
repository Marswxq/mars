# 核心API

**目录**

[[toc]]

## `ProcessEngine`

- 创建流程引擎对象。 activiti中最核心的类，其他类都是由ProcessEngine取得

### 获取`ProcessEngine`

```java
 ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
```

## 服务service

Activiti提供了7个服务接口，都通过ProcessEngine来获取，并且支持链式编程风格。

| 服务接口              | 说明                               |
|-------------------|----------------------------------|
| RepositoryService | 仓库服务，用于管理仓库，比如部署或删除流程定义，读取流程资源等。 |
| IdentifyService   | 身份服务，管理用户，组以及它们之间的关系。            |
| RuntimeService    | 运行时服务，管理所有正在运行的流程实例，任务等对象。       |
| TaskService       | 任务服务，管理任务。                       |
| FormService       | 表单服务，管理和流程，任务相关的表单。              |
| HistroyService    | 历史服务，管理历史数据。                     |
| ManagementService | 引擎管理服务，比如管理引擎的配置，数据库和作业等核心对象。    |

源码

```java
public interface EngineServices {
 
  RepositoryService getRepositoryService();
  
  RuntimeService getRuntimeService();
  
  FormService getFormService();
  
  TaskService getTaskService();
  
  HistoryService getHistoryService();
  
  IdentityService getIdentityService();
  
  ManagementService getManagementService();
  
  DynamicBpmnService getDynamicBpmnService();
  
  ProcessEngineConfiguration getProcessEngineConfiguration();
}
```

## `RepositoryService`

- `RepositoryService`是 Acitiviti 的仓库服务类。所谓的仓库指流程定义文档的两个文件： bpmn 文件和流程图片。

- `RepositoryService` 核心就是流程文件的部署，删除，查询流程定义。

### 获取`RepositoryService`

```java
RepositoryService repositoryService = processEngine.getRepositoryService();
```

### 部署工作流

```java
public class ActivitiRepTest {
 
    RepositoryService repositoryService;
 
    /**
     * 默认简化方式： 启动时会默认寻找classpath下面的activiti.cfg.xml文件
     */
    @Before
    public void initConfigWithDefault() {
        //创建流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        repositoryService = processEngine.getRepositoryService();
    }
 
    /**
     * 部署流程 直接加载bpmn文件和图片文件
     */
    @Test
    public void deployActivitByPath() {
        //创建部署对象
        DeploymentBuilder deploymentBuilder = repositoryService.createDeployment();
        //加载流程的配置文件和图片
        deploymentBuilder.addClasspathResource("diagrams/test.bpmn")
                .addClasspathResource("diagrams/test.png")
                .name("部署的流程定义名称")
                .category("业务分类，可自行定义")
        ;
        deploymentBuilder.deploy();
    }
 
    /**
     * 部署流程  直接加载bpmn文件和流程图片的压缩文件
     */
    @Test
    public void deployActivitByFileZip() {
        //创建部署对象
        DeploymentBuilder deploymentBuilder = repositoryService.createDeployment();
        InputStream inputStream = this.getClass().getResourceAsStream("diagrams/test.zip");
        ZipInputStream zipInputStream = new ZipInputStream(inputStream);
        //加载流程的配置文件和图片
        deploymentBuilder.addZipInputStream(zipInputStream)
                .name("部署的流程定义名称")
                .category("业务分类，可自行定义")
        ;
        deploymentBuilder.deploy();
    }
}
```

### 生成的表数据

```sql
# 其中 act_re_procdef 表中的 RESOURCE_NAME_ 字段 = act_ge_bytearray中NAME_字段
select *  from  act_re_deployment; -- 工作流部署表
select *  from  act_ge_bytearray; -- 存储二进制相关文件
select *  from  act_re_procdef; -- 流程定义数据
```

### 删除工作流

```java
repositoryService.deleteDeployment(deploymentId);
```

### 查询工作流

```java

    @Test
    public void queryProcessDefinition() {
        List<ProcessDefinition> processDefinitionList = repositoryService.createProcessDefinitionQuery()
                //添加查询条件
                //.processDefinitionName("流程定义的name")
                //.processDefinitionId("流程定义的id")
                //.processDefinitionKey("流程定义的key")
                //排序
                .orderByProcessDefinitionVersion().asc()
                //查询结果
                //.count() //返回结果集数量
                //.listPage(firstResult,  maxResults)//分页查询
                //.singleResult() //唯一结果
                .list();//总的结果集数量
    }
```

## `RuntimeService`

- `RuntimeService` 主要针对流程实例相关操作
- `RuntimeService`提供了很多启动流程的API，并且全部的命名规则为`startProcessInstanceByXX`，比如按照流程定义key值启动的，按照流程定义Id启动的等等。

### 获取`RuntimeService`

```java
RuntimeService  runtimeService = processEngine.getRuntimeService();
```

在Activiti中，启动了一个流程后，就会创建一个流程实例（ProcessInstance），简单来说流程实例就是根据一次（一条）业务数据用流程驱动的入口
Execution 的含义就是一个流程实例（ProcessInstance）具体要执行的过程对象。 两者的对象映射关系：ProcessInstance(1)—>Execution(
N)，其中N >= 1。 每个流程实例至少会有一个执行流（execution），如果流程中没有分支，则N=1，如果流程中出现了分支，则N>1

### 启动流程

```java
ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("processInsKey");
```

### 生成的表数据

1. 在`act_ru_execution`表产生一条数据，代表正在执行的流程对象，重点数据如下

| <div style="width: 200px">字段</div> | <div style="width: 300px">说明</div> |
|------------------------------------|------------------------------------|
| ID_                                | 正在执行的流程对象的ID                       |
| PROC_INST_ID_                      | 流程实例ID                             |
| PROC_DEF_ID_                       | 流程定义ID                             |
| ACT_ID_                            | 执行到流程任务节点的ID                       |

2. 在流程实例的历史表`act_hi_procinst`中产生一条数据

| <div style="width: 200px">字段   </div> | <div style="width: 300px">说明    </div> |
|---------------------------------------|----------------------------------------|
| ID_                                   | 正在执行的流程对象的ID                           |
| PROC_INST_ID_                         | 流程实例ID                                 |
| PROC_DEF_ID_                          | 流程定义ID                                 |
| ACT_ID_                               | 执行到流程任务节点的ID                           |
| START_TIME_                           | 流程开始时间                                 |
| END_TIME_                             | 流程结束时间                                 |

3. 在`act_ru_task`任务表生成一条数据（经常用的表），存储的流程上正在运行的节点任务，重点数据如下

| <div style="width:200px">字段</div> | <div style="width:200px">说明</div> |
|-----------------------------------|-----------------------------------|
| EXECUTION_ID_                     | 流程对象id（act_ru_execution表id）       |
| PROC_INST_ID_                     | 流程实例id                            |
| PROC_DEF_ID_                      | 流程定义id                            |
| NAME_                             | 当前流程任务的名称（流程图任务节点自己设置的name）       |
| TASK_DEF_KEY_                     | 当前流程任务的key（流程图任务节点自己设置的key）       |
| ASSIGNEE_                         | 当前任务代办人                           |
| CREATE_TIME_                      | 任务节点的创建时间                         |

4. `act_hi_taskinst`历史任务实例表，流程所有节点任务历史存储表，生成时机：流程在`act_ru_task`
   创建的时候，同时也会在`act_hi_taskinst`创建一条。`endtime`暂时还没有。，重点数据如下

| 字段            | 说明                          |
|---------------|-----------------------------|
| EXECUTION_ID_ | 流程对象id（act_ru_execution表id） |
| PROC_INST_ID_ | 流程实例id                      |
| PROC_DEF_ID_  | 流程定义id                      |
| NAME_         | 当前流程任务的名称（流程图任务节点自己设置的name） |
| TASK_DEF_KEY_ | 当前流程任务的key（流程图任务节点自己设置的key） |
| ASSIGNEE_     | 当前任务代办人                     |
| CREATE_TIME_  | 任务节点的创建时间                   |

5. `act_hi_actinst`历史所有经过的活动。某个流程实例历史上经过的全部活动节点，所有的活动，在这表中都会有数据

### 流程的激活和挂起

```java
@Test
public void suspendAndActivateProcessInstanceTest(){
    String  processDefinitionKey = "activit_key";
    ProcessInstance processInstance =         runtimeService.createProcessInstanceQuery().processDefinitionKey(processDefinitionKey).variableValueEquals("title","启动流程").singleResult();
    String processInstanceId = processInstance.getProcessInstanceId();

    System.out.println("流程实例是否挂起： " +processInstance.isSuspended());

    //挂起流程实例
    runtimeService.suspendProcessInstanceById(processInstanceId);
    //验证是否挂起
    Assert.assertTrue(runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult().isSuspended());

    //激活流程实例
    runtimeService.activateProcessInstanceById(processInstanceId);
    //验证是否激活
    Assert.assertTrue(!runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult().isSuspended());
}
```

### 流程实例的查询

```java
@Test
public void qrocessInstanceQuery() {
    
    String processDefinitionKey = "activit_key";//流程定义key
    
    //创建 流程实例查询对象
    ProcessInstanceQuery processInstanceQuery = runtimeService.createProcessInstanceQuery();

    //查询出多条记录
    List<ProcessInstance> processInstanceList = processInstanceQuery
            .processDefinitionKey(processDefinitionKey)//根据流程定义的key来查询
            //.processDefinitionVersion(1)//根据流程定义的版本号查询
            //.processDefinitionId("activit_key:4:1") //根据流程定义的id查询
            .orderByProcessDefinitionKey() //按照流程定义key的排序
            .desc() //降序
            .list();
  
    //如果能确定数据库查询的结果只有一条记录，可以采用 singleResult
    ProcessInstance processInstance = processInstanceQuery
            .processDefinitionKey(processDefinitionKey)//根据流程定义的key来查询
            .singleResult();
    System.out.println("流程实例ID： " + processInstance.getId());
    System.out.println("正在活动的节点ID： " + processInstance.getActivityId());
    System.out.println("流程定义的ID： " + processInstance.getProcessDefinitionId());

    //查询激活的流程实例
    List<ProcessInstance> activateList = runtimeService.createProcessInstanceQuery().processDefinitionKey(processDefinitionKey).active().list();
    Assert.assertTrue(activateList.size()>0);

    //相反 查询挂起的流程则是
    List<ProcessInstance> suspendList = runtimeService.createProcessInstanceQuery().processDefinitionKey(processDefinitionKey).suspended().list();
    Assert.assertTrue(suspendList.size()==0);

    //根据变量来查询
    // 根据title='启动流程',以及processDefinitionKey来作为查询条件进行查询
    List<ProcessInstance> varList = runtimeService.createProcessInstanceQuery().variableValueEquals("title","启动流程").list();
    Assert.assertTrue(varList.size()>0);

}
```

### 流程对象的查询

```java
@Test
public void executionQueryTest(){
    String  processDefinitionKey = "activit_key";
    List<Execution> executionList = runtimeService.createExecutionQuery().processDefinitionKey(processDefinitionKey).list();
}
```

### 流程实例的删除

```java
@Test
public void deleteProcessInstanceTest(){
    String  processDefinitionKey = "activit_key";
    ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processDefinitionKey(processDefinitionKey).variableValueEquals("title","启动流程").singleResult();
    String processInstanceId = processInstance.getProcessInstanceId();
    runtimeService.deleteProcessInstance(processInstanceId,"删除测试");
}
```

### 流程实例的状态查询

**注：**
在流程执行的过程中，创建的流程实例ID在整个流程执行过程中都不会变化，当流程结束后，流程实例会在正在执行的流程对象表中删除`act_ru_execution`

```java
@Test
public void queryProcessInstanceState(){
    String  processDefinitionKey = "activit_key";
    ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
            .processDefinitionKey(processDefinitionKey)
            .singleResult();
    if(processInstance!=null){
        System.out.println("当前流程处在："+processInstance.getActivityId());
    }else{
        System.out.println("当前流程已结束");
    }
}
```

## `HistoryService`

- 使用`HistoryService`的`createHistoricProcessInstanceQuery()`方法就可以得到`HistoricProcessInstanceQuery`
  对象，该对象主要用于流程实例的历史数据查询。对于流程实例，不管流程是否完成，都会保存到`ACT_HI_PROCINST`表中。

### 获取`HistoryService`

```java
HistoryService historyService = processEngine.getHistoryService();
```

### 查询历史流程实例

```java
@Test
public void queryHistoricProcessInstance(){
    String  processDefinitionKey = "activit_key";
    List<HistoricProcessInstance> historicProcessInstanceList =
            historyService.createHistoricProcessInstanceQuery() //创建历史流程实例查询对象
            .processDefinitionKey(processDefinitionKey)
            .orderByProcessInstanceEndTime()
            .desc()
            .list();
}
```

### 查询某个流程实例所有历史活动

```java

@Test
public void queryHistoricActivityInstance(){
    String  processInstanceId = "3002";
    List<HistoricActivityInstance> historicProcessInstanceList =
            historyService.createHistoricActivityInstanceQuery() //创建历史流程活动实例查询对象  包括流程活动全部类型
                    .processInstanceId(processInstanceId)
                    .activityType("userTask") //筛选出来 userTask 类型的活动
                    .list();
}
```

### 根据办理人查看历史流程任务

```java
@Test
public void queryHistoricTaskInstance(){
    String  processDefinitionKey = "activit_key";
    String assignee = "代理人张三";
    List<HistoricTaskInstance> historicTaskInstanceList =
            historyService.createHistoricTaskInstanceQuery()
                    .processDefinitionKey(processDefinitionKey)
                    .taskAssignee(assignee) //筛选出来 userTask 类型的活动
                    .list();
}
```

### 根据流程实例的ID查看历史流程变量

```java
@Test
public void queryHistoricVariableInstance(){
    String  processInstanceId = "3002";
    List<HistoricVariableInstance> historicVariableInstanceList =
            historyService.createHistoricVariableInstanceQuery()
                    .processInstanceId(processInstanceId)
                    .list();
}
```

## `TaskService`

- TaskService提供了许多操作流程任务的API,包括任务的查询、创建与删除、权限设置和参数设置等。

### 获取`TaskService`

```java
TaskService taskService = processEngine.getTaskService();
```

### 任务的创建与删除

一般情况下，可以通过定义流程描述 XML 文件来定义一个任务，Activiti 在解析该文件时，会将任务写到对应的数据表`ACT_RU_TASK`
中。在此过程中，创建任务的工作已由 Activiti 完成了。如果需要使用任务数据，则可以调用相应查询的API查询任务数据并且进行相应的设置。

1. Task接口

   一个Task实例表示流程中的一个任务，与其他实例一样，`Task`是一个接口，并且遵守数据映射实体的命名规范。`Task`
   的实现类为`TaskEntityImpl`,对应的数据库表为`ACT_RU_TASK`。TaskEntityImpl包括以下映射属性

    - id:主键，对应D字段。

    - revision:该数据版本号，对应REV字段。

    - owner::任务拥有人，对应OWNER字段。

    - assignee:被指定需要执行任务的人，对应ASSIGNEE字段。

    - delegationState:任务被委派的状态，对应DELEGATION字段。

    - parentTaskId:父任务的ID(如果本身是子任务的话)，对应PARENT_TASK_ID_字段。

    - name:任务名称，对应NAME字段。

    - description:任务的描述信息，对应DESCRIPTION字段。

    - priority:任务的优先级，默认值为50，表示正常状态，对应PRIORITY字段。

    - createTime:任务创建时间，对应CREATE_TIME字段。

    - dueDate:预订日期，对应DUE_DATE字段。

    - executionId:该任务对应的执行流D,对应EXECUTION ID字段。

    - processDefinitionId:任务对应的流程定义D,对应PROC_DEF_ID_字段。

    - claimTime:任务的提醒时间，对应CLAIM_TIME字段。

2. 创建与保存Task实例

   与创建用户组实例(Group)、用户实例(User)一样，`TaskService`提供了创建`Task`实例的方法。调用`TaskService`的`newTask()`
   与`new Task(String taskId)`方法，可以获取一个`Task`实例开发人员不需要关心`Task`的创建细节。调用这两个创建`Task`
   实例的方法时，`TaskService`会初始化Task的部分属性，这些属性包括`taskId`、创建时间等。

   创建了Task实例后，如果需要将其保存到数据库中，则可以使用`TaskService`的`saveTask(Task task)`方法，如果保存的`Task`
   实例有`ID`值，则会使用该值作为`Task`数据的主键，没有的话，则由`Activiti`为其生成主键。

   ```java
   ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
   TaskService taskService = processEngine.getTaskService();
   //保存第一个Task，不设置ID
   Task task1 = taskService.newTask();
   taskService.saveTask(task1);
   //保存第二个task，设置ID
   Task task2 = taskService.newTask("审核任务");
   taskService.saveTask(task2);
   ```

3. 删除任务

   TaskService提供了多个删除任务的方法，包括删除单个任务、删除多个任务的方法。由开发人员决定是否进行级联删除。

   删除任务时，将会删除该任务下面全部的子任务和该任务本身，如果设置了进行级联删除，则会删除与该任务相关的全部历史数据(`ACT_HI_TASKINST`
   表)
   和子任务，如果不进行级联删除，则会使用历史数据将该任务设置为结束状态。除此之外，如果尝试删除一条不存的任务数据（提供不存在的`taskId`)
   ,此时`deleteTask`方法会到历史数据表中查询是否存在该任务相关的历史数据，如果存在则删除，不存在则忽略。

    - `deleteTask(String taskId)` 根据Task的ID删除Task数据，调用该方法不会进行级联删除。
    - `deleteTask(String taskId,boolean cascade)` 根据Task的ID删除Task数据，由调用者决定是否进行级联删除。
    - `deleteTasks(CollectiontaskIds) 提供多个Task的ID进行多条数据删除，调用该方法不会进行级联删除。
    - `deleteTasks(Collection-taskIds,boolean cascade) 提供多个Task的ID进行多条数据删除，由调用者决定是否进行级联删除。

### 流程变量的设置和获取

```java
/**
 * 流程实例上的变量设置
 */
@Test
public void startProcessInstanceWithVariables(){
    String processDefinitionKey = "activit_key";//流程定义key
    Map<String ,Object> variables = new HashMap<>();
    variables.put("请假天数",1);
    variables.put("请假原因","呵呵哒");
    variables.put("请假事件",new Date());
    /**
     * todo 在流程实例上添加变量：影响的范围，当前流程实例下的所有任务都能够获取到该变量，正在执行的流程对象也能够获取到变量
     * todo 当流程实例结束后：流程变量消失，正在执行的对象消失，流程变量历史表保留变量
     * todo 影响的表如下：
     * select  *  from act_ru_variable; -- 存储运行时变量的表
     * select  *  from act_hi_varinst; -- 存储流程变量的历史表
     */
    runtimeService.startProcessInstanceByKey(processDefinitionKey,variables);
}


/**
 * 流程实例级别的变量查询（在流程实例启动的时候，就把变量放置到正在执行的流程对象中）
 */
@Test
public void queryProcessInstanceVariable(){
    String  processDefinitionKey = "activit_key";

    // ------  通过任务 获取流程实例上的变量 ----------------
    //查询正在执行的任务
    String assignee = "代理人张三";
    List<Task> taskList = taskService.createTaskQuery() //创建任务查询对象
            .processDefinitionKey(processDefinitionKey) //根据流程定义的key查询
            .taskAssignee(assignee)  //根据代理人查询
            .orderByTaskCreateTime() //按照任务创建时间排序
            .desc()
            .list();
    //获取当前执行的任务
    Task  task = taskList.get(0);
    //通过任务获取流程实例上的变量
    Map<String ,Object> variables = taskService.getVariables(task.getId());
    System.out.println(variables);


    // ------  通过执行对象 获取流程实例上的变量 ----------------
    List<Execution> executionList = runtimeService.createExecutionQuery() //创建正在执行的流程对象
            .processDefinitionKey(processDefinitionKey) //根据流程定义的key查询
            .list();
    Execution execution = executionList.get(0);
    Map<String ,Object> variables2 = runtimeService.getVariables(execution.getId());
    System.out.println(variables2);
}
```

数据表

```sql
# 存储运行时变量的表
select  *  from act_ru_variable; 
# 存储流程变量的历史表
select  *  from act_hi_varinst; 
```

### 在当前任务中存储和查询流程变量

```java
/**
 * 在当前任务中存储流程变量， 流程的变量存储在正在执行的流程对象上。当前任务后面的所有任务就都可以拿到这个流程变量
 *
 */
@Test
public void putVariableInTask(){
    String  processDefinitionKey = "activit_key";
    //查询正在执行的任务
    String assignee = "代理人张三";
    List<Task> taskList = taskService.createTaskQuery() //创建任务查询对象
            .processDefinitionKey(processDefinitionKey) //根据流程定义的key查询
            .taskAssignee(assignee)  //根据代理人查询
            .orderByTaskCreateTime() //按照任务创建时间排序
            .desc()
            .list();
    //获取当前执行的任务
    Task  task = taskList.get(0);
    //【方式1】设置流程变量
    taskService.setVariable(task.getId(),"变量1",100);
    taskService.setVariable(task.getId(),"变量21",200);
    taskService.setVariable(task.getId(),"变量3",300);
    //todo  setVariableLocal:流程变量只在当前任务有效，过了当前任务，后面就无法获取变量 【实际使用不多】
    taskService.setVariableLocal(task.getId(),"变量3",300);

    //【方式2】任务完成的同时，设置流程变量
    Map<String,Object>    variableMap = new HashMap<>();
    variableMap.put("变量1",100);
    variableMap.put("变量2",200);
    variableMap.put("变量3",300);
    taskService.complete(task.getId(),variableMap);

    //【方式3】放置mode实体变量
    LeaveModel leaveModel = new LeaveModel();
    leaveModel.setDays(5);
    leaveModel.setDescr("内容");
    leaveModel.setReason("内容原因");
    Map<String,Object>    variableObjectMap = new HashMap<>();
    variableObjectMap.put("变量4",leaveModel);
    taskService.complete(task.getId(),variableObjectMap);
}

/**
 * 获取流程变量
 */
@Test
public void getVariableInTask(){
    String  processDefinitionKey = "activit_key";
    //查询正在执行的任务
    String assignee = "代理人张三";
    List<Task> taskList = taskService.createTaskQuery() //创建任务查询对象
            .processDefinitionKey(processDefinitionKey) //根据流程定义的key查询
            .taskAssignee(assignee)  //根据代理人查询
            .orderByTaskCreateTime() //按照任务创建时间排序
            .desc()
            .list();
    //获取当前执行的任务
    Task  task = taskList.get(0);
    //【方式1】获取单个流程变量
    Integer v1 = (Integer) taskService.getVariable(task.getId(),"变量1");
    Integer v2 = (Integer) taskService.getVariable(task.getId(),"变量21");
    Integer v3 = (Integer) taskService.getVariable(task.getId(),"变量3");
    System.out.println(v1);
    System.out.println(v2);
    System.out.println(v3);

    //【方式2】获取map集合的流程变量
    Map<String,Object>    variableMap = taskService.getVariables(task.getId());
    System.out.println(variableMap);

    //【方式3】获取map中的mode实体变量
    LeaveModel leaveModel = (LeaveModel)variableMap.get("变量4");
}
```

### 自定义对象作为流程变量

```java
/**
 * 通过任务    在正在执行的流程对象中，放自定义的实体对象，该实体类必须实现序列化，并且要生成UID（反序列化需要）
 *
 */
@Test
public void putVariableInTaskWithObjectMap(){
    String  processDefinitionKey = "activit_key";
    //查询正在执行的任务
    String assignee = "代理人张三";
    List<Task> taskList = taskService.createTaskQuery() //创建任务查询对象
            .processDefinitionKey(processDefinitionKey) //根据流程定义的key查询
            .taskAssignee(assignee)  //根据代理人查询
            .orderByTaskCreateTime() //按照任务创建时间排序
            .desc()
            .list();
    //获取当前执行的任务
    Task  task = taskList.get(0);

    //【方式3】放置mode实体变量
    LeaveModel leaveModel = new LeaveModel();
    leaveModel.setDays(5);
    leaveModel.setDescr("内容");
    leaveModel.setReason("内容原因");
    Map<String,Object>    variableObjectMap = new HashMap<>();
    variableObjectMap.put("变量4",leaveModel);
    taskService.complete(task.getId(),variableObjectMap);
}

/**
 * 获取流程变量
 */
@Test
public void getVariableInTaskWithObjectMap(){
    String  processDefinitionKey = "activit_key";
    //查询正在执行的任务
    String assignee = "代理人张三";
    List<Task> taskList = taskService.createTaskQuery() //创建任务查询对象
            .processDefinitionKey(processDefinitionKey) //根据流程定义的key查询
            .taskAssignee(assignee)  //根据代理人查询
            .orderByTaskCreateTime() //按照任务创建时间排序
            .desc()
            .list();
    //获取当前执行的任务
    Task  task = taskList.get(0);
    //【方式1】获取单个流程变量
    Integer v1 = (Integer) taskService.getVariable(task.getId(),"变量1");
    Integer v2 = (Integer) taskService.getVariable(task.getId(),"变量21");
    Integer v3 = (Integer) taskService.getVariable(task.getId(),"变量3");
    System.out.println(v1);
    System.out.println(v2);
    System.out.println(v3);

    //【方式2】获取map集合的流程变量
    Map<String,Object>    variableMap = taskService.getVariables(task.getId());
    System.out.println(variableMap);

    //【方式3】获取map中的mode实体变量
    LeaveModel leaveModel = (LeaveModel)variableMap.get("变量4");
    System.out.println(leaveModel.getDays());
    System.out.println(leaveModel.getDescr());
    System.out.println(leaveModel.getReason());
}
```

### 查询历史流程变量

```java

/**
 * 根据流程实例的ID  查看历史流程变量
 */
@Test
public void queryHistoricVariableInstance(){
    String  processInstanceId = "3002";
    List<HistoricVariableInstance> historicVariableInstanceList =
            historyService.createHistoricVariableInstanceQuery()
                    .processInstanceId(processInstanceId)
                    .list();
}
```

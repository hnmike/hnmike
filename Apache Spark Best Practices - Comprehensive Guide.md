# Apache Spark Best Practices - Comprehensive Guide

## 🚀 Introduction
Apache Spark là một unified analytics engine mạnh mẽ cho large-scale data processing. Bài viết này tổng hợp các best practices và optimization techniques từ thực tế.

## 🔧 Core Optimization Techniques

### 1. Join Strategies
#### Broadcast Join
- **Khi sử dụng**: Table nhỏ (< 10MB) join với table lớn
- **Cách implement**: 
```python
from pyspark.sql.functions import broadcast
result = large_df.join(broadcast(small_df), "key")
```
- **Lưu ý**: Tránh OOM bằng cách disable auto-broadcast nếu cần:
```python
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "-1")
```

#### Bucket Join
- **Khi sử dụng**: Cả 2 table đều lớn, join thường xuyên
- **Setup**: 
```python
df.write.bucketBy(16, "join_key").sortBy("join_key").saveAsTable("bucketed_table")
```
- **Benefit**: Eliminates shuffle cho big data joins

### 2. Partitioning Strategies
#### Best Practices
- **Partition count**: 2-4x số cores available
- **Partition size**: 128MB - 1GB optimal range
- **Partition key**: Chọn based on query patterns

#### repartition() vs coalesce()
```python
# Tăng partitions (có shuffle)
df = df.repartition(200)

# Giảm partitions (minimize shuffle)  
df = df.coalesce(50)
```

### 3. Sorting Optimization
#### sortWithinPartitions vs orderBy
```python
# Local sort - không shuffle
df = df.sortWithinPartitions("timestamp")

# Global sort - có shuffle
df = df.orderBy("timestamp")
```

## 📊 Performance Monitoring & Tuning

### Key Metrics
- **Stage duration**: Identify bottlenecks
- **Shuffle read/write**: Minimize data movement
- **Memory usage**: Avoid spill to disk
- **Task distribution**: Check for data skew

### File Format Optimization
- **Parquet**: Columnar format, best cho analytics
- **Compression**: Snappy, Zstd cho balance speed/size
- **Predicate pushdown**: Automatic với Parquet

## 🛠️ Configuration Tuning

### Memory Management
```python
spark.conf.set("spark.executor.memory", "4g")
spark.conf.set("spark.driver.memory", "2g")
spark.conf.set("spark.sql.adaptive.enabled", "true")
```

### Adaptive Query Execution (AQE)
```python
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
```

## 🔗 Integration với Data Engineering Stack

### với Airflow
- Task parallelization
- Resource management
- Error handling strategies

### với Kafka
- Structured streaming
- Exactly-once processing
- Watermarking

### với Cloud Platforms
- **AWS**: EMR, Glue, S3 optimization
- **GCP**: Dataproc, BigQuery integration
- **Azure**: Synapse, Data Lake integration

## 📈 Advanced Patterns

### Delta Lake Integration
- ACID transactions
- Time travel
- Schema evolution
- Optimize commands

### ML Pipeline Optimization
- Feature engineering at scale
- Model training distribution
- Hyperparameter tuning

## 🎯 Real-world Use Cases

### ETL Pipelines
- Incremental data processing
- Data quality checks
- Error handling patterns

### Real-time Analytics
- Streaming joins
- Windowing operations
- State management

### Data Lake Architecture
- Medallion architecture (Bronze, Silver, Gold)
- Schema evolution
- Governance patterns

## 🚨 Common Pitfalls & Solutions

### Data Skew
- **Problem**: Uneven partition sizes
- **Solution**: Salting, repartitioning, broadcast joins

### Small Files Problem
- **Problem**: Too many small files
- **Solution**: Coalesce, optimize commands

### Memory Issues
- **Problem**: OOM errors
- **Solution**: Tune executor memory, increase partitions

## 📚 Learning Resources

### Official Documentation
- Spark SQL Guide
- Structured Streaming Guide
- Performance Tuning Guide

### Courses & Bootcamps
- DataExpert.io Bootcamp (Zach Wilson)
- Data Engineering Zoomcamp
- Databricks Academy

### Tools & Monitoring
- Spark UI analysis
- Ganglia/Prometheus integration
- Custom metrics collection

## 🔍 Related Topics
- [[Data Engineer Bootcamp]]
- [[DE zach wilson]]
- [[Building Real-Time Data Streaming Pipeline]]

---

*Tags: #spark #data-engineering #performance-optimization #big-data #data_engineer/etl* 
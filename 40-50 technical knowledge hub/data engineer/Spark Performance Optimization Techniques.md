# Spark Performance Optimization Techniques

## 📝 Based on Week 3 Homework - DataExpert.io

### 🎯 Key Learnings từ [[Apache Spark Best Practices - Comprehensive Guide]]

## 🔧 Practical Implementation

### 1. Disable Automatic Broadcast Join
```python
# Disable auto-broadcast để control thủ công
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "-1")
```

**Tại sao cần disable:**
- Tránh unexpected OOM errors
- Control memory usage chính xác
- Manual optimization cho performance tốt hơn

### 2. Manual Broadcast Join Implementation
```python
from pyspark.sql.functions import broadcast

# Broadcast small tables (medals, maps)
matches_with_maps = matches_df.join(broadcast(maps_df), "map_id")
medal_matches_with_medals = medal_matches_players_df.join(broadcast(medals_df), "medal_id")
```

**Best Practices:**
- Chỉ broadcast tables < 10MB
- Kiểm tra data size trước khi broadcast
- Monitor memory usage trong Spark UI

### 3. Bucket Join Strategy
```python
# Setup bucket tables với 16 buckets
match_details_df.write \
    .bucketBy(16, "match_id") \
    .sortBy("match_id") \
    .mode("overwrite") \
    .saveAsTable("match_details_bucketed")

matches_df.write \
    .bucketBy(16, "match_id") \
    .sortBy("match_id") \
    .mode("overwrite") \
    .saveAsTable("matches_bucketed")
```

## 📊 Performance Measurement Techniques

### File Size Comparison
```python
import os

def get_file_size(path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            total_size += os.path.getsize(filepath)
    return total_size

# Compare different bucketing strategies
size_v1 = get_file_size("warehouse/matches_bucketed")
size_v2 = get_file_size("warehouse/matches_bucketed_v2") 
size_v3 = get_file_size("warehouse/matches_bucketed_v3")
```

### Execution Time Monitoring
```python
import time

def time_query(query_func):
    start_time = time.time()
    result = query_func()
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Execution time: {execution_time:.2f} seconds")
    return result, execution_time
```

## 🎯 Real Performance Results từ Homework

### Optimization Impact:
- **sortWithinPartitions(match_id)**: Fastest execution
- **sortWithinPartitions(match_id, map_id)**: Balanced performance  
- **sortWithinPartitions(match_id, playlist_id)**: Good for low cardinality

### File Size Insights:
- Different sorting strategies → similar file sizes
- **Performance difference**: Execution time varies significantly
- **Key factor**: Data locality và partition alignment

## 🔍 Advanced Techniques

### 1. Adaptive Query Execution (AQE)
```python
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
```

### 2. Memory Optimization
```python
spark.conf.set("spark.executor.memory", "4g")
spark.conf.set("spark.executor.memoryFraction", "0.8")
spark.conf.set("spark.sql.adaptive.advisoryPartitionSizeInBytes", "128MB")
```

### 3. Partition Tuning
```python
# Optimal partition count
optimal_partitions = spark.sparkContext.defaultParallelism * 3
df = df.repartition(optimal_partitions, "partition_key")
```

## 📈 Monitoring & Debugging

### Spark UI Analysis
- **Stage Duration**: Identify bottlenecks
- **Shuffle Read/Write**: Minimize data movement
- **Task Timeline**: Check for stragglers
- **Storage Tab**: Monitor cached data

### Common Performance Issues
1. **Data Skew**: Uneven partition sizes
2. **Small Files**: Too many small partitions  
3. **Memory Spill**: Insufficient executor memory
4. **Inefficient Joins**: Wrong join strategy

## 🚀 Production Recommendations

### 1. Configuration Tuning
```python
# Production-ready configs
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
```

### 2. Monitoring Setup
- Custom metrics collection
- Alerting on performance degradation
- Regular performance benchmarking

### 3. Best Practices Checklist
- [ ] Use appropriate file formats (Parquet)
- [ ] Optimize partition strategy
- [ ] Choose correct join type
- [ ] Monitor memory usage
- [ ] Implement proper error handling

## 🔗 Related Resources
- [[Building Real-Time Data Streaming Pipeline]]
- [[Data engineer lab 1]]
- [[resources/DataExpert.io - Apache Spark Week 3 Homework Spark Fundamentals]]

---

*Practical optimization techniques từ real-world assignments và best practices.*

**Tags:** #spark #performance-optimization #homework #dataexpert #practical-implementation 
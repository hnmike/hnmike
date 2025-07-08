---
created-date: 2025-07-08
up: 
related: 
aliases: 
tags: 
summary:
---

---
Reference: KIMBALL

## Nguyên Lý Cốt Lõi của Dimensional Modeling

## 1. Quy Trình 4 Bước Thiết Kế Dimensional Model

Kimball đề xuất quy trình 4 bước chuẩn để thiết kế dimensional model
(https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/:
[Dimensional Modeling Techniques - Kimball Group](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/)
1. **Choose the business process** (Chọn quy trình kinh doanh): Xác định hoạt động kinh doanh cần phân tích
    
2. **Declare the grain** (Xác định độ chi tiết): Quyết định mức độ chi tiết của dữ liệu trong fact table
    
3. **Identify the dimensions** (Xác định các chiều): Tìm ra các thuộc tính mô tả cho fact table
    
4. **Identify the facts** (Xác định các fact): Xác định các phép đo có thể tính toán được
    

## 2. Star Schema và Snowflake Schema

**Star Schema** là cấu trúc cơ bản nhất trong dimensional modeling[6](https://www.holistics.io/books/setup-analytics/kimball-s-dimensional-data-modeling/)[7](https://www.datacamp.com/blog/star-schema-vs-snowflake-schema):

- Fact table ở trung tâm chứa các metrics/measurements
    
- Dimension tables xung quanh chứa các thuộc tính mô tả
    
- Cấu trúc đơn giản, dễ hiểu và query nhanh
    
- Sử dụng denormalized data để tối ưu hóa performance
    

**Snowflake Schema** là phiên bản chuẩn hóa của Star Schema[7](https://www.datacamp.com/blog/star-schema-vs-snowflake-schema)[8](https://www.geeksforgeeks.org/dbms/difference-between-star-schema-and-snowflake-schema/):

- Dimension tables được chia nhỏ thành sub-dimension tables
    
- Giảm redundancy nhưng tăng độ phức tạp của joins
    
- Tiết kiệm storage nhưng chậm hơn trong query performance
    

## Các Thành Phần Quan Trọng Trong Kimball Methodology

## Fact Tables và Dimension Tables

**Fact Tables**[9](https://learn.microsoft.com/en-us/fabric/data-warehouse/dimensional-modeling-fact-tables)[10](https://www.simplilearn.com/fact-table-vs-dimension-table-article):

- Lưu trữ measurements, metrics hoặc facts về quy trình kinh doanh
    
- Chứa foreign keys liên kết đến dimension tables
    
- Có thể chứa additive, semi-additive, hoặc non-additive facts
    
- Thường là table lớn nhất trong schema
    

**Dimension Tables**[10](https://www.simplilearn.com/fact-table-vs-dimension-table-article):

- Chứa descriptive attributes để provide context cho facts
    
- Có primary key (thường là surrogate key)
    
- Cho phép drilling down và rolling up trong analysis
    
- Thường nhỏ hơn fact tables về số lượng records
    

## Slowly Changing Dimensions (SCD)

Kimball đã phát triển framework để xử lý việc thay đổi dữ liệu trong dimension tables[1](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/)[11](https://www.geeksforgeeks.org/software-testing/slowly-changing-dimensions/)[12](https://en.wikipedia.org/wiki/Slowly_changing_dimension):

- **Type 0**: Không thay đổi (Fixed Dimension)
    
- **Type 1**: Ghi đè dữ liệu cũ (Overwrite)
    
- **Type 2**: Thêm record mới (Add New Row) - phổ biến nhất
    
- **Type 3**: Thêm column mới (Add New Attribute)
    
- **Type 4**: Sử dụng history table riêng biệt
    
- **Type 6**: Kết hợp Type 1, 2, và 3
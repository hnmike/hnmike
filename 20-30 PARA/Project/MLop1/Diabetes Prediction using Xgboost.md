---
Priority_Level: 
Status: 1 To Do
Date_Created: 
Due_Date: 
Connections: 
tags: 
Type: project_note
cssclasses:
---
# Components
**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area),optionQuery(#resource), optionQuery(#project)):connections]`  
**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`
**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`
**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`
**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`
# Description

# Overview Architecture
Dự án này dường như được xây dựng theo kiến trúc microservice hoặc một service độc lập tập trung vào việc dự đoán bệnh tiểu đường. Các thành phần chính bao gồm:

- **API Service:** Một ứng dụng web API được xây dựng bằng **FastAPI** để nhận dữ liệu đầu vào (các chỉ số sức khỏe) và trả về kết quả dự đoán.
- **Machine Learning Model:** Một mô hình học máy (có thể là **XGBoost** hoặc mô hình từ **Scikit-learn** dựa trên `requirements.txt`) đã được huấn luyện trước để thực hiện dự đoán. Mô hình này có thể được lưu dưới dạng file (ví dụ: `.joblib`).
- **Data Science Workflow:** Các notebooks (thường trong thư mục `notebooks/`) dùng cho việc khám phá dữ liệu, tiền xử lý, huấn luyện và đánh giá mô hình.
- **Containerization:** **Docker** được sử dụng để đóng gói ứng dụng và các phụ thuộc, đảm bảo tính nhất quán giữa các môi trường. `docker-compose.yml` có thể được dùng để quản lý môi trường phát triển cục bộ (local).
- **CI/CD:** **GitHub Actions** (trong `.github/workflows/`) được thiết lập để tự động hóa quy trình kiểm thử (testing), xây dựng (building) và có thể là triển khai (deployment).
- **Infrastructure as Code (IaC) / Configuration Management:** **Ansible** (`requirements_dev.txt` và có thể có thư mục `infra/`) được sử dụng để tự động hóa việc cấu hình hoặc khởi tạo hạ tầng.
- **Monitoring & Observability:**
    - **OpenTelemetry:** Tích hợp vào ứng dụng FastAPI để thu thập traces và metrics.
    - **Prometheus:** Thu thập (scrape) metrics từ ứng dụng.
    - **Grafana:** Trực quan hóa metrics từ Prometheus thông qua dashboards.
    - **Jaeger:** (Dựa trên `opentelemetry-exporter-jaeger`) Có thể được sử dụng để trực quan hóa traces.
- **Testing:** **Pytest** được dùng để viết và chạy unit tests cũng như integration tests.
- **Development Workflow:** Sử dụng `pre-commit` để đảm bảo chất lượng code và `Makefile` để chuẩn hóa các lệnh thường dùng.

**2. Phân tích các thành phần chính:**

- **`app/` directory:**
    - `main.py`: Chứa logic chính của FastAPI application, định nghĩa các endpoints (ví dụ: `/predict`).
    - `predict.py`: Chứa hàm tải mô hình đã huấn luyện và thực hiện dự đoán.
    - `schemas.py`: Định nghĩa các Pydantic model để validate dữ liệu request và response.
    - `models/` (nếu có): Thư mục chứa file mô hình đã được huấn luyện (ví dụ: `model.joblib`).
    - Các file liên quan đến monitoring (`monitoring.py`, `telemetry.py`...): Cấu hình và khởi tạo OpenTelemetry.
- **`notebooks/` directory:** Chứa các file `.ipynb` cho việc phân tích dữ liệu và huấn luyện mô hình.
- **`tests/` directory:** Chứa các file test (`test_*.py`) cho Pytest.
- **`.github/workflows/` directory:** Chứa các file YAML định nghĩa quy trình CI/CD trên GitHub Actions.
- **`infra/` directory (nếu có):** Chứa các Ansible playbooks (`*.yml`) để quản lý hạ tầng.
- **`monitoring/` directory (nếu có):** Chứa file cấu hình cho Prometheus (`prometheus.yml`), dashboards Grafana (`*.json`).
- **`Dockerfile`:** Định nghĩa cách xây dựng Docker image cho ứng dụng FastAPI.
- **`docker-compose.yml`:** Định nghĩa các services (app, prometheus, grafana) để chạy cục bộ.
- **`requirements.txt` & `requirements_dev.txt`:** Liệt kê các thư viện Python cần thiết cho production và development.
- **`Makefile`:** Chứa các lệnh tắt tiện lợi (ví dụ: `make test`, `make build`, `make run`).
- **`README.md`:** Tài liệu quan trọng mô tả dự án, cách cài đặt và sử dụng.

**3. Hướng dẫn xây dựng/Tiếp cận dự án:**

Để xây dựng lại hoặc tiếp tục phát triển dự án này, bạn có thể thực hiện các bước sau:

1. **Thiết lập môi trường:**
    
    - Clone repository về máy.
    - Tạo và kích hoạt môi trường ảo (virtual environment): `python -m venv venv && source venv/bin/activate` (hoặc tương tự trên Windows).
    - Cài đặt các phụ thuộc: `pip install -r requirements_dev.txt` (bao gồm cả dev dependencies) hoặc `pip install -r requirements.txt` (chỉ cho production).
    - Cài đặt pre-commit hooks: `pre-commit install`.
2. **Tìm hiểu Mô hình ML:**
    
    - Mở và chạy các notebooks trong thư mục `notebooks/` để hiểu quy trình xử lý dữ liệu và huấn luyện mô hình.
    - Xác định vị trí file mô hình đã được huấn luyện (thường là `.joblib` hoặc tương tự) và cách nó được tải trong `app/predict.py`.
3. **Chạy và Thử nghiệm API:**
    
    - Chạy ứng dụng FastAPI cục bộ: `uvicorn app.main:app --reload` (hoặc sử dụng lệnh trong `Makefile` nếu có).
    - Truy cập địa chỉ `http://127.0.0.1:8000/docs` trên trình duyệt để xem giao diện Swagger UI, nơi bạn có thể thử nghiệm các API endpoints.
    - Nghiên cứu code trong `app/main.py`, `app/predict.py`, `app/schemas.py` để hiểu luồng xử lý request.
4. **Chạy Tests:**
    
    - Thực thi các bài kiểm thử: `pytest` hoặc `make test`.
5. **Sử dụng Docker:**
    
    - Build Docker image: `docker build -t diabetes-prediction .` (hoặc `make build`).
    - Chạy ứng dụng và các dịch vụ liên quan (nếu có `docker-compose.yml`): `docker-compose up -d` (hoặc `make run`). Lệnh này có thể khởi động cả API, Prometheus, Grafana nếu được cấu hình.
6. **Tìm hiểu CI/CD:**
    
    - Xem các file trong `.github/workflows/` để hiểu các bước tự động hóa: linting, testing, building image, deployment (nếu có).
7. **Tìm hiểu Infrastructure & Configuration:**
    
    - Nếu có thư mục `infra/`, nghiên cứu các Ansible playbooks để hiểu cách chúng cấu hình máy chủ hoặc môi trường triển khai.
8. **Thiết lập và Khám phá Monitoring:**
    
    - Nếu dùng `docker-compose`, Prometheus và Grafana có thể đã chạy. Truy cập Grafana (thường ở cổng 3000) để xem dashboards.
    - Tìm hiểu cách OpenTelemetry được tích hợp trong code FastAPI (`app/`).

**4. Đề xuất từ góc độ Kiến trúc sư:**

- **Model Versioning:** Cần có chiến lược quản lý phiên bản mô hình rõ ràng (có thể sử dụng MLflow, DVC hoặc một cơ chế đặt tên file/thư mục đơn giản). Điều này quan trọng khi huấn luyện lại mô hình.
- **Data Validation:** Đảm bảo việc validate dữ liệu đầu vào tại tầng API (`schemas.py`) là đủ mạnh mẽ để xử lý các trường hợp ngoại lệ.
- **Configuration Management:** Nên quản lý các cấu hình (ví dụ: đường dẫn tới model, API keys nếu có) một cách tập trung và an toàn (sử dụng biến môi trường, file `.env`, hoặc các công cụ quản lý cấu hình).
- **Scalability:** Kiến trúc hiện tại với FastAPI và Docker là một khởi đầu tốt. Nếu cần khả năng mở rộng cao hơn, xem xét triển khai trên Kubernetes hoặc các nền tảng Serverless.
- **Security:** Xem xét các khía cạnh bảo mật: xác thực API (nếu cần), giới hạn tần suất request, quét lỗ hổng bảo mật trong các thư viện phụ thuộc.
- **Error Handling:** Xây dựng cơ chế xử lý lỗi rõ ràng và log lỗi chi tiết để dễ dàng gỡ rối.


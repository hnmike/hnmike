---
title: "(18) Post | Feed | LinkedIn"
source: "https://www.linkedin.com/feed/update/urn:li:activity:7307928814670491648/"
author:
published: 3h
created: 2025-03-19
description:
tags:
type :
---
Tổng quan các bước trong OAuth2 với Authorization Code Grant, một trong những luồng bảo mật và phổ biến nhất.

1. Authorize (Ủy quyền):
- Client yêu cầu người dùng ủy quyền truy cập vào tài nguyên của họ trên Resource Server.
- Yêu cầu này được chuyển hướng đến Auth Server.

2. Verify User (Xác minh người dùng):
- Auth Server xác minh danh tính của người dùng.
- Đây thường là bước đăng nhập, nơi người dùng cung cấp thông tin đăng nhập (username/password).

3. User Consent:
- Auth Server hỏi người dùng có đồng ý cho Client truy cập vào tài nguyên của họ hay không.
- Người dùng có thể xem danh sách các quyền mà Client yêu cầu và quyết định cấp hoặc từ chối.

4. Return Authorization Code:
- Nếu người dùng đồng ý, Auth Server tạo ra một mã ủy quyền (Authorization Code) và trả về cho Client.
- Mã ủy quyền này chỉ có giá trị trong thời gian ngắn.

5. Request Access Token:
- Client sử dụng mã ủy quyền để yêu cầu Access Token từ Auth Server.
- Yêu cầu này bao gồm mã ủy quyền, ID của Client và secret key của Client.

6. Return Access Token:
- Auth Server xác minh mã ủy quyền và thông tin của Client, sau đó trả về Access Token cho Client.
- Access Token này cho phép Client truy cập vào tài nguyên của người dùng.
- Có thể trả về Refresh Token để lấy lại Access Token khi hết hạn.

7. Request Resource:
- Client sử dụng Access Token để yêu cầu tài nguyên từ Resource Server.

8. Validate Token:
- Resource Server gửi mã truy cập lên Auth Server để xác thực.
- Resource Server hoàn toàn có thể được config để tự xác thực ở bước này.

9. Valid Token:
- Auth Server trả về cho Resource Server thông tin token là hợp lệ.

10. Return Resource:
- Resource Server kiểm tra tính hợp lệ của token và trả về tài nguyên được yêu cầu cho Client.

-----
Connect để cùng nhau chia sẻ nhé! Cảm ơn ae 🥰

---
title: "Implementing the Outbox Pattern with Kafka, Kafka Connect, and Debezium"
author:
  - "Mohammad Al-Ali"
published: 2023-09-09
source: "https://www.youtube.com/watch?v=D63LsapPwfw&list=LL&index=159"
image: "https://i.ytimg.com/vi/D63LsapPwfw/maxresdefault.jpg"
created: 2025-03-20
tags:
  - "youtube"
  - "Outbox_Pattern"
  - "Kafka_Connect_Debezium"
  - "Stream_Processing"
summary: "Learn how to implement the Outbox Pattern with Kafka, Kafka Connect, and Debezium in a Spring Boot application for reliable data streaming."
---
# Implementing the Outbox Pattern with Kafka, Kafka Connect, and Debezium

![Implementing the Outbox Pattern with Kafka, Kafka Connect, and Debezium](https://www.youtube.com/embed/D63LsapPwfw&list=LL&index=159)

> [!summary]- Description
> Implementing the Outbox Pattern with Kafka, Kafka Connect, and Debezium 
> 
> Links:
> 
> Debezium Docs on Logical Decoding Output Plugins https://debezium.io/documentation/reference/stable/postgres-plugins.html
> 
> Debezium Docs on Outbox Event Router: https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html
> 
> Source code on Github:
> https://github.com/mAlaliSy/outbox-pattern

> [!note]- Transcript (Youtube)
> الرحمن الرحيم السلام عليكم حياكم الله في الفيديو الثاني على هذا الفيديو راح نشوف تطبيق عملي عن باستخدام مع سبرينج بوت اب الفيديو الماضي تكلمنا كيف نحلها باستخدام شفنا طريقتين هذا الفيديو راح يكون راح نشوف تطبيق الطريقه الثانيه اللي هي باستخدام السي دي سي اول شيء خلينا نشوف الاشياء اللي نحتاجها اللي محتاجينها انا حاليا مشغلها باستخدام عندي هنا محتاجين عشان عندي بروفايل يعني فيها نستودع عليها في ايضا يمكن نستخدمه يعني بالمثال هذا احنا راح نستخدم في الباسورد عندنا الفرامل هذا اللي هو اللي يحتاجه طيب خلونا نشوف انا عندي هنا خذ الى استخدام ماب ستراكس انا عندي هنا عليها \[موسيقى\] انا راح استخدم راح اخلي هاي هو اللي يسوي باستخدام هذه يعني انا عندي هنا فهذه \[موسيقى\] اول شيء راح يسوي لها يعني اختلفت في طبعا هذا يعني المفروض ما يكون في المفروض يكون عندي طيب نرجع للسيرفس بعد ما سويت انا راح اسوي بعدها انا اسوي سيف للاوردر وعندي انا هنا اسوي من دي تي او بعدها انا محتاج احفظ الايفنت هذا انه الاوردر فينت انا مسميه هنا فيه الكرمز اللي شفناها بالفيديو الماضي الاي دي فانا من الاردن الى بعدها هنا في شيء غريب شوي انه اسوي مباشره اسوي احنا قلنا انه يشتغل او السي دي سي تشتغل عن طريق انه يقرا الوال تشينجز راحت على فقط على حسب يعني اللي احنا مسوينها احنا فهو فقط راح يقرا الريكورد هذا في الوال والاجنور الدليت هذا فاحنا مو محتاجين نحفظ الاوتبوكس ايفنت مو محتاجين الداتا هذه انه نحفظها في التيبل فممكن نسوي لها يعني محتاجينها في ممكن نخليها يعني لاحظ معي ان هذه كلها في 1 ترانزاكشن المي كلها انه بمعنى انه كل هذا داخل وهذا هو الجوهر انه انا عندي يعني طيب خلونا نشغل الابلكيشن انا عندي الداتا بيز والدكومبوست كله اب اند رونينج الكونتينرز \[موسيقى\] وعندي ايضا كونكت باستخدام التول تبع طيب خلونا نشوف كيف نسوي تبع انا عندي هنا عندي بوست تبع الكابت على البورت تبع الكاف اللي هي عندي هذا الاسم هو اوردرز بعدها نشغل اكثر من تاسك بنفس الكون هذه يعني ولكن بالحاله هذه يعني احنا ما نقدر نستفيد منها لانه المفروض يكون تاسك وحده فقط هي اللي تقرا يعني فما راح نقدر نستفيد من بعدها بما انه على كونتينر على كونتينر فاحنا ما راح نقدر نستخدم اللوك الهوست لانه راح يسوي على نفس الكونتينر نفسها داخل الكونتينر بس انا محتاج انه اوصل للهوست نفس الهوست ماشيين فعندي هذا عندي هنا انا مسوي او التيبلز في نفس فهي بعدين التيبلز اللي انا محتاجها اللي هي الاوت بوكس ايفنت وعندي احنا محتاجين بس يعني في يعني هنا حطيناها راح يحط مسج في التوبك بس احنا مو محتاجينها عندي هنا عنده اكثر من ترانسفورم احنا راح نستخدم الاوت بوكس يعني عندي هنا راح استخدم شفناه باللاوت بوكس لانه نسيت اوضح في المابنج ايش الموجود فيه هو عندي هنا يعني هذا فانا راح اعتمد على بتكون هي اسم عندي هنا اللي هو الكيل المسج للكاف كمسج فانا مستخدم الاجريجت اي دي اللي هو الاوردر اي دي فالاوردر اي دي هو راح يكون الكي للكاف كمسج بهذه الطريقه احنا راح نضمن انه كل الايفنس اللي ريليتد 1 اوردر راح على نفس فهي والبي كونسي بنفس الاوردر بنفس الترتيب اللي هي يعني فيه وعندي هنا وهذه هو ديكودنج للوال د عندها مفهوم اللوجيكل دينك وهي انه الوالفورمات يصير لديك يكون سهل انه يعني اللي هي يعني في البوست جريس نفسها هذه راح يعني على البروتو بوف فورمات هذه تحتاج يعني نحتاج نسوي فانا مستخدم البلوجين هذه الديفولت عشان ابسط الموضوع هذا يشرح كيف نسوي انستول الديكور هذه هي موجوده على راح احط اللينك في الوصف ايضا طيب خلونا نسوي \[موسيقى\] بس قبلها خلونا نسوي نضيف جديد باسم الاوردر نفس طيب طلعت انا هذه هي ريكو هذا راح تكون بس انا مو محتاجه لانه \[موسيقى\] نفس الفاليو اللي راح يكون اسمها اوردر فاليو هذي ما راح تفرق معي مره ثانيه الكونكتر طيب طيب هذا اللي شفناها قبل شوي عندي انا هنا دامي يعني طيب المفروض الحين يكون عندي في الداتا بيز 1 اوردر في مشكله عندي من بالمابنج \[موسيقى\] اه اوكي المفروض بعد المابنج هذا انه لازم نسوي الاوردر عشان يعني هما غير كافي انه انا اضيف الاوردر فيست هذه لازم ايضا اسوي ست للاوردر في الاوردر 9 لازم طيب نشغل الابلكيشن مره ثانيه المفروض يكون في عندي اوردر لاينز اه صح عندنا لسه فيكم اللي هي الكاسكيت تشغل مره ثانيه المفروض الان يكون عندنا طيب انا عندي صار في اوردرز يعني واحد الاخير منهم بس اللي عندهم لو نشوف ما راح نلاقي فيه اي اداه لانه احنا كنا بس المفروض ان التوبك الان الاوردر فيه ثري ممكن نشوفها فانا عندي هذه الاثري مسجز عندي الكي هنا اللي هو الاوردر اي دي عندي اللي هي فبهذا الطريقه راح نكون باستخدام انا سويت على هذا اللي هو بعد هذا راح من اللوغ او من الرايه اخذ الداتا من الاوتبوكس وراح وداها على الكافكا بهذا نكون وصلنا الى نهايه الفيديو اذا اعجبكم الشرح لا تنسوا تحطوا لايك وتشتركوا بالقناه يعطيكم العافيه


 > [!info]
> - **Outbox Pattern Implementation (0:00):** The video demonstrates a practical implementation of the Outbox Pattern using Kafka, Kafka Connect, and Debezium with a Spring Boot application.
> - **Tech Stack (0:42):**  The implementation uses PostgreSQL, Kafka, and Kafka Connect, all containerized with Docker Compose.
> - **Data Mapping with Mapstruct (1:59):** Data mapping is done using Mapstruct to transfer data.
> - **Single Transaction Importance (5:21):** Emphasizes the importance of performing all operations (saving order, creating event) within a single transaction to ensure atomicity.
> - **Kafka Connect Configuration (6:30):** Explains how to configure Kafka Connect, including the Debezium connector.
> - **Key Configuration for Kafka Messages (10:46):** The aggregate ID (order ID) is used as the key for Kafka messages.
> - **Logical Decoding (11:30):** Uses pgoutput format for logical decoding.
> - **Outbox Event Router Transformation (9:03):** The video uses Outbox Event Router transformation.
> - **Setting up Kafka Connect using the tool (6:17)\"
> 
> 
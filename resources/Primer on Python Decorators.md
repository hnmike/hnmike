---
title: Primer on Python Decorators
summary: Learn Python decorators! Understand how they wrap functions/classes to modify
  behavior, add logging, timing, caching, and more, enhancing code readability and
  reusability.
source: https://realpython.com/primer-on-python-decorators/
author:
- '[[Real Python]]'
published: 2024-12-14
created: 2025-07-10
description: In this tutorial, you'll look at what Python decorators are and how you
  define and use them. Decorators can make your code more readable and reusable. Come
  take a look at how decorators work under the hood and practice writing your own
  decorators.
tags: null
type: null
permalink: resources/primer-on-python-decorators
---

>[!summary]+ This tutorial provides a comprehensive guide to Python decorators. It starts by explaining foundational concepts like first-class functions, inner functions, and functions as return values. It then introduces simple decorators, the `@` syntax, handling arguments and return values, and using `functools.wraps`. The tutorial covers practical examples like timing, debugging, and registration. Finally, it delves into advanced topics such as decorating classes, nesting decorators, decorators with arguments (including optional ones), stateful decorators, class-based decorators, singletons, caching (`lru_cache`), adding units, and JSON validation.
![Python Decorators](https://files.realpython.com/media/Primer-on-Python-Decorators_Watermarked.d0da542fa3fc.jpg)

Python Decorators

Watch Now This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: [**Python Decorators 101**](https://realpython.com/courses/python-decorators-101/)

Python decorators allow you to modify or extend the behavior of functions and methods without changing their actual code. When you use a Python decorator, you wrap a function with another function, which takes the original function as an argument and returns its modified version. This technique provides a simple way to implement higher-order functions in Python, enhancing code reusability and readability.

**By the end of this tutorial, you’ll understand that:**

- **Practical use cases** for decorators include logging, enforcing access control, caching results, and measuring execution time.
- **Custom decorators** are written by defining a function that takes another function as an argument, defines a nested wrapper function, and returns the wrapper.
- **Multiple decorators** can be applied to a single function by stacking them before the function definition.
- The **order of decorators** impacts the final output since each decorator wraps the next, influencing the behavior of the decorated function.

You can find all the examples from this tutorial by downloading the accompanying materials below:

==**Take the Quiz:**== Test your knowledge with our interactive “Decorators” quiz. You’ll receive a score upon completion to help you track your learning progress:

---

[![Python Decorators](https://files.realpython.com/media/Primer-on-Python-Decorators_Watermarked.d0da542fa3fc.jpg)](https://realpython.com/quizzes/decorators/)

**Interactive Quiz**

[Decorators](https://realpython.com/quizzes/decorators/)

In this quiz, you'll revisit the foundational concepts of what Python decorators are and how to create and use them.

## Python Functions

In order to understand decorators, you must first understand some finer points of how [functions](https://realpython.com/defining-your-own-python-function/) work. There are many aspects to functions, but in the context of decorators, **a function returns a value based on the given arguments**. Here’s a basic example:

Python

In general, functions in Python may also have side effects rather than just turning an input into an output. [The `print()` function](https://realpython.com/python-print/) is an example of this: it [returns](https://realpython.com/python-return-statement/) [`None`](https://realpython.com/null-in-python/) while having the side effect of outputting something to the console. However, to understand decorators, it’s enough to think about functions as tools that turn given arguments into values.

### First-Class Objects

In [functional programming](https://realpython.com/python-functional-programming/), you work almost entirely with pure functions that don’t have side effects. While not a purely functional language, Python supports many functional programming concepts, including treating functions as [first-class objects](https://dbader.org/blog/python-first-class-functions).

This means that *functions can be passed around and used as arguments*, just like [any other object like `str`, `int`, `float`, `list`, and so on](https://realpython.com/python-data-types/). Consider the following three functions:

Python `greeters.py`

Here, `say_hello()` and `be_awesome()` are regular functions that expect a name given as a string. The `greet_bob()` function, however, expects a function as its argument. You can, for example, pass it the `say_hello()` or the `be_awesome()` function.

To test your functions, you can run your code in interactive mode. You do this with the `-i` flag. For example, if your code is in a file named `greeters.py`, then you run `python -i greeters.py`:

Python

Note that `greet_bob(say_hello)` refers to two functions, `greet_bob()` and `say_hello`, but in different ways. The `say_hello` function is named without parentheses. This means that only a reference to the function is passed. The function isn’t executed. The `greet_bob()` function, on the other hand, is written with parentheses, so it will be called as usual.

This is an important distinction that’s crucial for how functions work as first-class objects. A function name without parentheses is a reference to a function, while a function name with trailing parentheses calls the function and refers to its return value.

### Inner Functions

It’s possible to [define functions](https://realpython.com/defining-your-own-python-function/) *inside other functions*. Such functions are called [inner functions](https://realpython.com/inner-functions-what-are-they-good-for/). Here’s an example of a function with two inner functions:

Python `inner_functions.py`

What happens when you call the `parent()` function? Think about this for a minute. Then run `inner_functions.py` in interactive mode to try it out. The output will be as follows:

Python

Note that the order in which the inner functions are defined does not matter. Like with any other functions, the printing only happens when the inner functions are executed.

Furthermore, the inner functions aren’t defined until the parent function is called. They’re [locally scoped](https://realpython.com/python-scope-legb-rule/) to `parent()`, meaning they only exist inside the `parent()` function as local [variables](https://realpython.com/python-variables/). Try calling `first_child()`. You’ll get an error:

Python

Whenever you call `parent()`, the inner functions `first_child()` and `second_child()` are also called. But because of their local scope, they aren’t available outside of the `parent()` function.

### Functions as Return Values

Python also allows you to return functions from functions. In the following example, you rewrite `parent()` to return one of the inner functions:

Python `inner_functions.py`

Note that you’re returning `first_child` without the parentheses. Recall that this means that you’re *returning a reference to the function* `first_child`. In contrast, `first_child()` with parentheses refers to the result of evaluating the function. You can see this in the following example:

Python

The somewhat cryptic output means that the `first` variable refers to the local `first_child()` function inside of `parent()`, while `second` points to `second_child()`.

You can now use `first` and `second` as if they’re regular functions, even though you can’t directly access the functions they point to:

Python

You recognize the return values of the inner functions that you defined inside of `parent()`.

Finally, note that in the earlier example, you executed the inner functions within the parent function—for example, `first_child()`. However, in this last example, you didn’t add parentheses to the inner functions, such as `first_child`, upon returning. That way, you got a reference to each function that you could call in the future.

## Simple Decorators in Python

Now that you’ve seen that functions are just like any other object in Python, you’re ready to move on and see the magical beast that is the Python decorator. You’ll start with an example:

Python `hello_decorator.py`

Here, you’ve defined two regular functions, `decorator()` and `say_whee()`, and one inner `wrapper()` function. Then you redefined `say_whee()` to apply `decorator()` to the original `say_whee()`.

Can you guess what happens when you call `say_whee()`? Try it in a REPL. Instead of running the file with the `-i` flag, you can also import the function manually:

Python

To understand what’s going on here, look back at the earlier examples. You’re applying everything that you’ve learned so far.

The so-called decoration happens at the following line:

Python

In effect, the name `say_whee` now points to the `wrapper()` inner function. Remember that you return `wrapper` as a function when you call `decorator(say_whee)`:

Python

However, `wrapper()` has a reference to the original `say_whee()` as `func`, and it calls that function between the two calls to `print()`.

Put simply, *a decorator wraps a function, modifying its behavior.*

Before moving on, have a look at a second example. Because `wrapper()` is a regular Python function, the way a decorator modifies a function can change dynamically. So as not to disturb your neighbors, the following example will only run the decorated code during the day:

Python `quiet_night.py`

If you try to call `say_whee()` after bedtime, nothing will happen:

Python

Here, `say_whee()` doesn’t print any output. That’s because the `if` test failed, so the wrapper didn’t call `func()`, the original `say_whee()`.

### Adding Syntactic Sugar

Look back at the code that you wrote in `hello_decorator.py`. The way you decorated `say_whee()` is a little clunky. First of all, you end up typing the name `say_whee` three times. Additionally, the decoration gets hidden away below the definition of the function.

Instead, Python allows you to *use decorators in a simpler way with the `@` symbol*, sometimes called the [pie syntax](https://www.python.org/dev/peps/pep-0318/#background). The following example does the exact same thing as the first decorator example:

Python `hello_decorator.py`

So, `@decorator` is just a shorter way of saying `say_whee = decorator(say_whee)`. It’s how you apply a decorator to a function.

### Reusing Decorators

Recall that a decorator is just a regular Python function. All the usual tools for reusability are available. Now, you’ll create a [module](https://realpython.com/python-modules-packages/) where you store your decorators and that you can use in many other functions.

Create a file called `decorators.py` with the following content:

Python `decorators.py`

The `do_twice()` decorator calls the decorated function twice. You’ll soon see the effect of this in several examples.

You can now use this new decorator in other files by doing a regular [import](https://realpython.com/absolute-vs-relative-python-imports/):

Python

When you run this example, you should see that the original `say_whee()` is executed twice:

Python

There are two *Whee!* exclamations printed, confirming that `@do_twice` does what it says on the tin.

### Decorating Functions With Arguments

Say that you have a function that accepts some arguments. Can you still decorate it? Give it a try:

Python

You now apply `@do_twice` to `greet()`, which expects a name. Unfortunately, calling this function raises an error:

Python

The problem is that the inner function `wrapper_do_twice()` doesn’t take any arguments, but you passed `name="World"` to it. You could fix this by letting `wrapper_do_twice()` accept one argument, but then it wouldn’t work for the `say_whee()` function that you created earlier.

The solution is to use [`*args` and `**kwargs`](https://realpython.com/python-kwargs-and-args/) in the inner wrapper function. Then it’ll accept an arbitrary number of positional and keyword arguments. Rewrite `decorators.py` as follows:

Python `decorators.py`

The `wrapper_do_twice()` inner function now accepts any number of arguments and passes them on to the function that it decorates. Now both your `say_whee()` and `greet()` examples work. Start a fresh REPL:

Python

You use the same decorator, `@do_twice`, to decorate two different functions. This hints at one of the powers of decorators. They add behavior that can apply to many different functions.

### Returning Values From Decorated Functions

What happens to the return value of decorated functions? Well, that’s up to the decorator to decide. Say you decorate a simple function as follows:

Python

Try to use it:

Python

Oops, your decorator ate the return value from the function.

Because the `do_twice_wrapper()` doesn’t explicitly return a value, the call `return_greeting("Adam")` ends up returning `None`.

To fix this, you need to *make sure the wrapper function returns the return value of the decorated function*. Change your `decorators.py` file:

Python `decorators.py`

Now you return the return value of the last call of the decorated function. Check out the example again:

Python

This time, `return_greeting()` returns the greeting `'Hi Adam'`.

### Finding Yourself

A great convenience when working with Python, especially in the interactive shell, is its powerful introspection ability. [Introspection](https://en.wikipedia.org/wiki/Type_introspection) is the ability of an object to know about its own attributes at runtime. For instance, a function knows its own name and [documentation](https://realpython.com/documenting-python-code/):

Python

When you inspect `print()`, you can see its name and documentation. The introspection works for functions that you define yourself as well:

Python

However, after being decorated, `say_whee()` has gotten very confused about its identity. It now reports being the `wrapper_do_twice()` inner function inside the `do_twice()` decorator. Although technically true, this isn’t very useful information.

To fix this, decorators should use the [`@functools.wraps`](https://docs.python.org/library/functools.html#functools.wraps) decorator, which will preserve information about the original function. Update `decorators.py` again:

Python `decorators.py`

You don’t need to change anything about the decorated `say_whee()` function, but you need to restart your REPL to see the effect:

Python

Much better! Now `say_whee()` is still itself after decoration.

You’ve now learned the basics of how to create a decorator. However, `@do_twice` isn’t a very exciting decorator, and there aren’t a lot of use cases for it. In the next section, you’ll implement several decorators that illustrate what you know so far and that you can use in your own code.

## A Few Real World Examples

You’ll now look at a few more useful examples of decorators. You’ll notice that they’ll mainly follow the same pattern that you’ve learned so far:

Python

This formula is a good boilerplate template for building more complex decorators.

You’ll continue to store your decorators in `decorators.py`. Recall that you can download all the examples in this tutorial:

### Timing Functions

You’ll start by creating a `@timer` decorator. It’ll measure the time a function takes to execute and then print the duration to the console. Here’s the code:

Python `decorators.py`

This decorator works by storing the time just before the function starts running in line 10 and just after the function finishes in line 12. The runtime of the function is then the difference between the two, calculated in line 13. You use [`time.perf_counter()`](https://docs.python.org/library/time.html#time.perf_counter), which does a good job of measuring time intervals.

Now, add `waste_some_time()` as an example of a function that spends some time, so that you can test `@timer`. Here are some examples of timings:

Python

Run it yourself. Work through the definition of `@timer` line by line. Make sure you understand how it works. Don’t worry if you don’t get everything, though. Decorators are advanced beings. Try to sleep on it or make a drawing of the program flow.

If you’re interested in learning more about timing functions, then have a look at [Python Timer Functions: Three Ways to Monitor Your Code](https://realpython.com/python-timer/).

### Debugging Code

The following `@debug` decorator will print a function’s arguments and its return value every time you call the function:

Python `decorators.py`

The signature is created by joining the [string representations](https://realpython.com/python-repr-vs-str/) of all the argument:

- **Line 9:** You create a list of the positional arguments. Use `repr()` to get a nice string representing each argument.
- **Line 10:** You create a list of the keyword arguments. The [f-string](https://realpython.com/python-f-strings/) formats each argument as `key=value`, and again, you use `repr()` to represent the value.
- **Line 11:** You join together the lists of positional and keyword arguments to one signature string with each argument separated by a comma.
- **Line 14:** You print the return value after the function is executed.

It’s time to see how the decorator works in practice by applying it to a simple function with one positional and one keyword argument:

Python

Note how the `@debug` decorator prints the signature and return value of the `make_greeting()` function:

Python

This example might not seem immediately useful since the `@debug` decorator just repeats what you wrote. It’s more powerful when applied to small convenience functions that you don’t call directly yourself.

The following example calculates an approximation of the [mathematical constant *e*](https://en.wikipedia.org/wiki/E_\(mathematical_constant\)):

Here, you also apply a decorator to a function that has already been defined. In line 4, you decorate `factorial()` from the `math` standard library. You can’t use the pie syntax, but you can still manually apply the decorator. The approximation of *e* is based on the following [series expansion](https://en.wikipedia.org/wiki/E_\(mathematical_constant\)):

![Series for calculating mathematical constant e](https://files.realpython.com/media/e_series_long.7ce8d6492b4f.png)

Series for calculating mathematical constant e

When calling the `approximate_e()` function, you can see the `@debug` decorator at work:

In this example, you get a decent approximation of the true value *e* ≈ 2.718281828, adding only five terms.

### Slowing Down Code

In this section, you’ll create a decorator that slows down your code. This might not seem very useful. Why would you want to slow down your Python code?

Probably the most common use case is that you want to rate-limit a function that continuously checks whether a resource—like a web page—has changed. The `@slow_down` decorator will sleep one second before it calls the decorated function:

Python `decorators.py`

In `@slow_down`, you call `time.sleep()` to have your code take a pause before calling the decorated function. To see how the `@slow_down` decorator works, you create a `countdown()` function. To see the effect of slowing down the code, you should run the example yourself:

Python

In `countdown()`, you check if `from_number` is smaller than one. In that case, you print *Liftoff!*. If not, then you print the number and keep counting.

The `@slow_down` decorator always sleeps for one second. [Later](https://realpython.com/primer-on-python-decorators/#slowing-down-code-revisited), you’ll see how to control the rate by passing an argument to the decorator.

Decorators don’t have to wrap the function that they’re decorating. They can also simply register that a function exists and return it unwrapped. You can use this, for example, to create a lightweight plugin architecture:

The `@register` decorator only stores a reference to the decorated function in the global `PLUGINS` dictionary. Note that you don’t have to write an inner function or use `@functools.wraps` in this example because you’re returning the original function unmodified.

You can now register functions as follows:

Note that the `PLUGINS` dictionary already contains references to each function object that’s registered as a plugin:

Python

Python applies decorators when you define a function, so `say_hello()` and `be_awesome()` are immediately registered. You can then use `PLUGINS` to call these functions:

Python

The `randomly_greet()` function randomly chooses one of the registered functions to use. In the f-string, you use the [`!r` flag](https://realpython.com/python-f-strings/#using-an-objects-string-representations-in-f-strings). This has the same effect as calling `repr(greeter)`.

The main benefit of this simple plugin architecture is that you don’t need to maintain a list of which plugins exist. That list is created when the plugins register themselves. This makes it trivial to add a new plugin: just define the function and decorate it with `@register`.

If you’re familiar with `globals()` in Python, then you might see some similarities to how the plugin architecture works. With `globals()`, you get access to all [global variables](https://realpython.com/python-use-global-variable-in-function/) in the current scope, including your plugins:

Python

Using the `@register` decorator, you can create your own curated list of interesting names, effectively hand-picking some functions from `globals()`.

### Authenticating Users

The final example before moving on to some fancier decorators is commonly used when working with a web framework. In this example, you’ll use [Flask](https://realpython.com/tutorials/flask/) to set up a `/secret` web page that should only be visible to users that are logged in or otherwise authenticated:

While this gives an idea about how to add authentication to your web framework, you should usually not write these types of decorators yourself. For Flask, you can use [the Flask-Login extension](https://flask-login.readthedocs.io/en/latest/#flask_login.login_required) instead, which adds more security and functionality.

## Fancy Decorators

So far, you’ve seen how to create simple decorators. You already have a pretty good understanding of what decorators are and how they work. Feel free to take a break from this tutorial to practice everything that you’ve learned.

In the second part of this tutorial, you’ll explore more advanced features, including how to do the following:

- Add **decorators to classes**
- Add **several decorators** to one function
- Create decorators with **arguments**
- Create decorators that can **optionally** take arguments
- Define **stateful** decorators
- **Define classes** that act as decorators

Ready to dive in? Here you go!

### Decorating Classes

There are two different ways that you can use decorators on classes. The first one is very close to what you’ve already done with functions: you can *decorate the methods of a class*. This was [one of the motivations](https://www.python.org/dev/peps/pep-0318/#motivation) for introducing decorators back in the day.

Some commonly used decorators are even built-ins in Python, including [`@classmethod`, `@staticmethod`](https://realpython.com/instance-class-and-static-methods-demystified/), and [`@property`](https://realpython.com/python-property/). The `@classmethod` and `@staticmethod` decorators are used to define methods inside a class [namespace](https://realpython.com/python-namespaces-scope/) that aren’t connected to a particular instance of that class. The `@property` decorator is used to customize [getters and setters](https://realpython.com/python-getter-setter/) for [class attributes](https://realpython.com/python-classes/#class-attributes). Expand the box below for an example using these decorators:

The following definition of a `Circle` class uses the `@classmethod`, `@staticmethod`, and `@property` decorators:

Python `circle.py`

Inside `Circle` you can see several different kinds of methods. Decorators are used to distinguish them:

- `.cylinder_volume()` is a regular method.
- `.radius` is a **mutable property**. It can be set to a different value. However, by defining a setter method, you do some error testing to make sure `.radius` isn’t set to a nonsensical negative number. Properties are accessed as attributes without parentheses.
- `.area` is an **immutable property**. Properties without `.setter()` methods can’t be changed. Even though it’s defined as a method, it can be retrieved as an attribute without parentheses.
- `.unit_circle()` is a class method. It’s not bound to one particular instance of `Circle`. Class methods are often used as factory methods that can create specific instances of the class.
- `.pi()` is a static method. It’s not really dependent on the `Circle` class, except that it’s part of its namespace. You can call static methods on either an instance or the class.

You can use `Circle` as follows:

Python

In these examples, you explore the different methods, attributes, and properties of `Circle`.

Next, define a class where you decorate some of its methods using the [`@debug`](https://realpython.com/primer-on-python-decorators/#debugging-code) and [`@timer`](https://realpython.com/primer-on-python-decorators/#timing-functions) decorators from [earlier](https://realpython.com/primer-on-python-decorators/#a-few-real-world-examples):

Python `class_decorators.py`

Using this class, you can see the effect of the decorators:

Python

When you create a new instance of `TimeWaster`, Python calls `.__init__()` under the hood, as your use of `@debug` reveals. The `@timer` decorator helps you monitor how much time is spent on `.waste_time()`.

The other way to use decorators on classes is to *decorate the whole class*. This is, for example, done in the [`dataclasses` module](https://realpython.com/python-data-classes/):

Python

The meaning of the syntax is similar to the function decorators. In the example above, you could’ve decorated the class by writing `PlayingCard = dataclass(PlayingCard)`.

A [common use of class decorators](https://www.python.org/dev/peps/pep-3129/#rationale) is to be a simpler alternative to some use cases of [metaclasses](https://realpython.com/python-metaclasses/). In both cases, you’re changing the definition of a class dynamically.

Writing a class decorator is very similar to writing a function decorator. The only difference is that the decorator will receive a class and not a function as an argument. In fact, all the decorators that [you saw above](https://realpython.com/primer-on-python-decorators/#a-few-real-world-examples) will work as class decorators. When you’re using them on a class instead of a function, their effect might not be what you want. In the following example, the `@timer` decorator is applied to a class:

Python `class_decorators.py`

Decorating a class doesn’t decorate its methods. Recall that `@timer` is just shorthand for `TimeWaster = timer(TimeWaster)`. Here, `@timer` only measures the time that it takes to instantiate the class:

Python

The output from `@timer` is only shown as `tw` is created. The call to `.waste_time()` isn’t timed.

[Later](https://realpython.com/primer-on-python-decorators/#creating-singletons), you’ll see an example defining a proper class decorator, namely `@singleton`, which ensures that there’s only one instance of a class.

### Nesting Decorators

You can *apply several decorators* to a function at once by stacking them on top of each other:

Python

Think about this as the decorators being executed in the order they’re listed. In other words, `@debug` calls `@do_twice`, which calls `greet()`, or `debug(do_twice(greet()))`:

Python

The greeting is printed twice because of `@do_twice`. However, the output from `@debug` is only shown once, since it’s called before the `@do_twice` decorator. Observe the difference if you change the order of `@debug` and `@do_twice`:

Python

Here, `@do_twice` is applied to `@debug` as well. You can see that both calls to `greet()` are annotated with debugging information.

### Defining Decorators With Arguments

Sometimes, it’s useful to *pass arguments to your decorators*. For instance, `@do_twice` could be extended to a `@repeat(num_times)` decorator. The number of times to execute the decorated function could then be given as an argument.

If you define `@repeat`, you could do something like this:

Python

Think about how you’d implement `@repeat`.

So far, the name written after the `@` has referred to a function object that can be called with another function. To be consistent, you then need `repeat(num_times=4)` to return a function object that can act as a decorator. Luckily, you [already know how to return functions](https://realpython.com/primer-on-python-decorators/#functions-as-return-values)! In general, you want something like the following:

Python

Typically, the decorator creates and returns an inner wrapper function, so writing the example out in full will give you an inner function within an inner function. While this might sound like the programming equivalent of the [*Inception*](https://en.wikipedia.org/wiki/Inception), you’ll untangle it all in a moment:

Python `decorators.py`

It looks a little messy, but you’ve only put the same decorator pattern that you’ve seen many times by now inside one additional `def` that handles the arguments to the decorator. First, consider the innermost function:

Python

This `wrapper_repeat()` function takes arbitrary arguments and returns the value of the decorated function, `func()`. This wrapper function also contains the loop that calls the decorated function `num_times` times. This is no different from the earlier wrapper functions that you’ve seen, except that it’s using the `num_times` parameter that must be supplied from the outside.

One step out, you’ll find the decorator function:

Python

Again, `decorator_repeat()` looks exactly like the decorator functions that you’ve written earlier, except that it’s named differently. That’s because you reserve the base name— `repeat()` —for the outermost function, which is the one the user will call.

As you’ve already seen, the outermost function returns a reference to the decorator function:

Python

There are a few subtle things happening in the `repeat()` function:

- Defining `decorator_repeat()` as an inner function means that `repeat()` will refer to a function object, `decorator_repeat`. Earlier, you used decorators like `@do_twice` without parentheses. Now, you need to add parentheses when setting up the decorator, as in `@repeat()`. This is necessary in order to add arguments.
- The `num_times` argument is seemingly not used in `repeat()` itself. But by passing `num_times`, a [closure](https://realpython.com/inner-functions-what-are-they-good-for/) is created where the value of `num_times` is stored until `wrapper_repeat()` uses it later.

With everything set up, test your code to see if the results are as expected:

Python

That’s just the result that you were aiming for.

### Creating Decorators With Optional Arguments

With a little bit of care, you can also define *decorators that can be used both with and without arguments*. Most likely, you don’t need this, but it is nice to have the flexibility. Like [*Winnie-the-Pooh*](https://en.wikipedia.org/wiki/Winnie-the-Pooh) says:

> Both—but don’t bother about the bread, please. ([Source](https://www.gutenberg.org/ebooks/67098))

As you saw in the previous section, when a decorator uses arguments, you need to add an extra outer function. The challenge now is for your code to figure out if you’ve called the decorator with or without arguments.

Since the function to decorate is only passed in directly if the decorator is called without arguments, the function must be an optional argument. This means that the decorator arguments must all be specified by keyword. You can enforce this with the special asterisk (`*`) syntax, which means that [all the following parameters are keyword-only](https://realpython.com/python-asterisk-and-slash-special-parameters/):

Python

Here, the `_func` argument acts as a marker, noting whether the decorator has been called with arguments or not:

- **Line 1:** If you’ve called `@name` without arguments, then the decorated function will be passed in as `_func`. If you’ve called it with arguments, then `_func` will be `None`, and some of the keyword arguments may have been changed from their default values. The asterisk in the argument list means that you can’t call the remaining arguments as positional arguments.
- **Line 6:** In this case, you called the decorator with arguments. Return a decorator function that takes a function as an argument and returns a wrapper function.
- **Line 8:** In this case, you called the decorator without arguments. Apply the decorator to the function immediately.

Using this boilerplate on the `@repeat` decorator in the previous section, you can write the following:

Python `decorators.py`

Compare this with the original `@repeat`. The only changes are the added `_func` parameter and the `if` … `else` block at the end.

[Recipe 9.6](https://github.com/dabeaz/python-cookbook/blob/master/src/9/defining_a_decorator_that_takes_an_optional_argument/example.py) of the excellent [*Python Cookbook*](https://realpython.com/asins/1449340377/) shows an alternative solution using [`functools.partial()`](https://docs.python.org/library/functools.html#functools.partial).

You can now apply `@repeat` to different functions to test that you can now use it with or without arguments:

Python

Recall that the default value of `num_times` is `2`, so using `@repeat` without any arguments is equivalent to using `@do_twice`:

Python

Here, *Whee!* is repeated twice since that’s the default behavior of `@repeat`. As specified by the argument, the greeting is repeated three times.

### Tracking State in Decorators

Sometimes, it’s useful to have *a decorator that can keep track of state*. As an example, you’ll create a decorator that counts the number of times a function is called.

In the [next section](https://realpython.com/primer-on-python-decorators/#using-classes-as-decorators), you’ll see how to use classes to keep state. But in simple cases, you can also get away with using [function attributes](https://www.python.org/dev/peps/pep-0232/):

Python `decorators.py`

The state—the number of calls to the function—is stored in the function attribute `.num_calls` on the wrapper function. Here’s the effect of using it:

Python

You apply `@count_calls` to your old friend, `say_whee()`. Each time you call the function, you see that the call count increases. You can also manually query the `.num_calls` attribute.

### Using Classes as Decorators

The typical way to maintain state in Python is by [using classes](https://realpython.com/python-classes/). In this section, you’ll see how to rewrite the `@count_calls` example from the previous section to *use a class as a decorator*.

Recall that the decorator syntax `@decorator` is just a quicker way of saying `func = decorator(func)`. Therefore, if `decorator` is a class, it needs to take `func` as an argument in its [`.__init__()` initializer](https://realpython.com/python-class-constructor/). Furthermore, the class instance needs to be [callable](https://realpython.com/python-callable-instances/) so that it can stand in for the decorated function.

For a class instance to be callable, you implement the special [`.__call__()`](https://docs.python.org/3/reference/datamodel.html#emulating-callable-objects) method:

Python

The `.__call__()` method is executed each time you try to call an instance of the class:

Python

Each time you call `counter()`, the state changes as the count increases. Therefore, a typical implementation of a decorator class should implement `.__init__()` and `.__call__()`:

Python `decorators.py`

The `.__init__()` method must store a reference to the function, and it can do any other necessary initialization. The `.__call__()` method will be called instead of the decorated function. It does essentially the same thing as the `wrapper()` function in your earlier examples. Note that you need to use the [`functools.update_wrapper()`](https://docs.python.org/library/functools.html#functools.update_wrapper) function instead of `@functools.wraps`.

This `@CountCalls` decorator works the same as the one in the previous section:

Python

Each call to `say_whee()` is counted and noted. In the next section, you’ll look at more examples of decorators.

You’ve come a long way now, having figured out how to create all kinds of decorators. You’ll wrap it up, putting your newfound knowledge to use by creating a few more examples that might be useful in the real world.

### Slowing Down Code, Revisited

As noted earlier, your [previous implementation of `@slow_down`](https://realpython.com/primer-on-python-decorators/#slowing-down-code) always sleeps for one second. Now you know how to add parameters to decorators, so you can rewrite `@slow_down` using an optional `rate` argument that controls how long it sleeps:

Python `decorators.py`

You’re using the boilerplate introduced in the [Creating Decorators With Optional Arguments](https://realpython.com/primer-on-python-decorators/#creating-decorators-with-optional-arguments) section to make `@slow_down` callable both with and without arguments. The same recursive `countdown()` function [as earlier](https://realpython.com/primer-on-python-decorators/#slowing-down-code) now sleeps two seconds between each count:

Python

As before, you must run the example yourself to see the effect of the decorator:

Python

There’ll be a two second pause between each number in the countdown.

### Creating Singletons

A singleton is a class with only one instance. There are several singletons in Python that you use frequently, including `None`, `True`, and `False`. The fact that `None` is a singleton allows you to compare for `None` using the [`is` keyword](https://realpython.com/python-is-identity-vs-equality/), like you did when [creating decorators with optional arguments](https://realpython.com/primer-on-python-decorators/#creating-decorators-with-optional-arguments):

Python

Using `is` returns `True` only for objects that are the exact same instance. The following `@singleton` decorator turns a class into a singleton by storing the first instance of the class as an attribute. Later attempts at creating an instance simply return the stored instance:

Python `decorators.py`

As you see, this class decorator follows the same template as your function decorators. The only difference is that you’re using `cls` instead of `func` as the parameter name to indicate that it’s meant to be a class decorator.

Check it out in practice:

Python

By comparing object IDs and checking with the `is` keyword, you confirm that `first_one` is indeed the exact same instance as `another_one`.

Class decorators are less common than function decorators. You should document these well, so that your users know how to apply them.

### Caching Return Values

Decorators can provide a nice mechanism for [caching](https://en.wikipedia.org/wiki/Cache_%28computing%29) and [memoization](https://en.wikipedia.org/wiki/Memoization). As an example, look at a [recursive](https://realpython.com/python-thinking-recursively/) definition of the [Fibonacci sequence](https://realpython.com/fibonacci-sequence-python/):

Python

While this implementation is straightforward, its runtime performance is terrible:

Python

To calculate the tenth Fibonacci number, you should only need to calculate the preceding Fibonacci numbers, but this implementation somehow needs a whopping 177 calculations. It gets worse quickly: 21,891 calculations are needed for `fibonacci(20)` and almost 2.7 million calculations for the thirtieth number. This is because the code keeps recalculating Fibonacci numbers that are already known.

The usual solution is to implement Fibonacci numbers using a [`for` loop](https://realpython.com/python-for-loop/) and a lookup table. However, caching the calculations will also do the trick. First add a `@cache` decorator to your module:

Python `decorators.py`

The cache works as a lookup table, as it stores calculations in a dictionary. You can add it to `fibonacci()`:

Python

You still use `@count_calls` to monitor the performance of your calculations. With the cache, `fibonacci()` only does the necessary calculations once:

Python

Note that in the call to `fibonacci(8)`, no new calculations were needed since the eighth Fibonacci number had already been calculated for `fibonacci(10)`.

In the standard library, a [Least Recently Used (LRU) cache](https://realpython.com/lru-cache-python/) is available as [`@functools.lru_cache`](https://docs.python.org/library/functools.html#functools.lru_cache). Additionally, you can use a regular cache with [`@functools.cache`](https://docs.python.org/3/library/functools.html#functools.cache).

These decorators have more features than the one you saw above. You should use `@functools.lru_cache` or `@functools.cache` instead of writing your own cache decorator.

In the next example, you don’t return the result immediately. Instead, you add a call to `print()` to see when a result is calculated and not just retrieved from the cache:

Python

The `maxsize` parameter specifies how many recent calls are cached. The default value is 128, but you can specify `maxsize=None` to cache all function calls. Using `@functools.cache` has the same effect as `maxsize=None`. However, be aware that this can cause memory problems if you’re caching many large objects.

You can use the `.cache_info()` method to see how the cache performs, and you can tune it if needed. In your example, you used an artificially small `maxsize` to see the effect of elements being removed from the cache:

Python

```
>>> fibonacci(10)
Calculated fibonacci(1) = 1
Calculated fibonacci(0) = 0
Calculated fibonacci(2) = 1
Calculated fibonacci(3) = 2
Calculated fibonacci(4) = 3
Calculated fibonacci(5) = 5
Calculated fibonacci(6) = 8
Calculated fibonacci(7) = 13
Calculated fibonacci(8) = 21
Calculated fibonacci(9) = 34
Calculated fibonacci(10) = 55
55

>>> fibonacci(8)
21

>>> fibonacci(5)
Calculated fibonacci(1) = 1
Calculated fibonacci(0) = 0
Calculated fibonacci(2) = 1
Calculated fibonacci(3) = 2
Calculated fibonacci(4) = 3
Calculated fibonacci(5) = 5
5

>>> fibonacci(8)
Calculated fibonacci(6) = 8
Calculated fibonacci(7) = 13
Calculated fibonacci(8) = 21
21

>>> fibonacci(5)
5

>>> fibonacci.cache_info()
CacheInfo(hits=17, misses=20, maxsize=4, currsize=4)
```

In these examples, you calculate a few Fibonacci numbers. Your cache only holds four calculations at a time. For example, after calculating `fibonacci(10)`, it holds the seventh, eight, ninth, and tenth number.

Therefore, you’re able to find `fibonacci(8)` without doing any recalculations. Then you ask for `fibonacci(5)`, but that fifth number has been deleted from the cache. It therefore needs to be calculated from scratch.

In most applications, you don’t need to constrain your cache and can use `@functools.cache` directly.

### Adding Information About Units

The following example is somewhat similar to the [registering plugins](https://realpython.com/primer-on-python-decorators/#registering-plugins) example from earlier, in that it doesn’t really change the behavior of the decorated function. Instead, it simply adds `unit` as a function attribute:

The following example calculates the volume of a cylinder based on its radius and height in centimeters:

Python

You’ve added information to `volume()` that the result should be interpreted as cubic centimeters. You can later access the `.unit` function attribute when needed:

Python

Note that you could’ve achieved something similar using [function annotations](https://www.python.org/dev/peps/pep-3107/):

Python

However, since annotations are [used for type hints](https://www.python.org/dev/peps/pep-0484/), it’s a bit clunky to combine such units as [annotations](https://realpython.com/python39-new-features/#annotated-type-hints) with [static type checking](https://realpython.com/python-type-checking/#static-type-checking).

Units become even more powerful and fun when connected with a library that can convert between units. One such library is [`pint`](http://pint.readthedocs.io/). With `pint` installed ([`python -m pip install Pint`](https://pypi.org/project/Pint/)), you can convert the volume to cubic inches or gallons, for example:

Python

You use `pint` to create a quantity that has both a magnitude and a unit. By calling `.to()`, you convert to other units. For example, the example cylinder is about 141 cubic centimeters, which translates to approximately 8.63 cubic inches and 0.0373 gallons.

You could also modify the decorator to return a `pint` [`Quantity`](https://pint.readthedocs.io/en/latest/getting/tutorial.html) directly. Such a `Quantity` is made by multiplying a value with the unit. In `pint`, units must be looked up in a `UnitRegistry`. You can store the registry as a function attribute on the decorator to avoid cluttering the namespace:

Python `decorators.py`

With the `@use_unit` decorator, converting units is practically effortless:

Python

When [Usain Bolt](https://en.wikipedia.org/wiki/Usain_Bolt) ran [100 meters](https://en.wikipedia.org/wiki/Men%27s_100_metres_world_record_progression) in 9.58 seconds at the [2009 world championships](https://en.wikipedia.org/wiki/2009_World_Championships_in_Athletics), he had an average speed of 10.4 meters per second. This translates to about 37.6 kilometers per hour and 23.4 miles per hour.

### Validating JSON

You’ll now look at one last use case. Take a quick look at the following [Flask](https://realpython.com/tutorials/flask/) route handler:

Python

Here you ensure that the key `student_id` is part of the request. Although this validation works, it doesn’t really belong in the function itself. Additionally, there may be other routes that use the same validation. So, to keep it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), you can abstract out any unnecessary logic with a decorator. The following `@validate_json` decorator will do the job:

Python `decorator_flask.py`

In the above code, the decorator takes a variable-length list as an argument so that you can pass in as many string arguments as necessary, each representing a key used to validate the [JSON](https://realpython.com/python-json/) data:

- **Line 4:** The list of keys that must be present in the JSON is given as arguments to the decorator.
- **Line 9:** The wrapper function validates that each expected key is present in the JSON data.

The route handler can then focus on its real job—updating grades—as it can safely assume that the JSON data are valid:

Python `decorator_flask.py`

You apply `@validate_json`, which simplifies the logic inside `update_grade()`.

## Conclusion

This has been quite a journey! You started this tutorial by looking closer at functions, and particularly how you can define them inside other functions and pass them around just like any other Python object. Then you learned about decorators and how to write them such that:

- They can be reused.
- They can decorate functions with arguments and return values.
- They can use `@functools.wraps` to look more like the decorated function.

In the second part of the tutorial, you saw more advanced decorators and learned how to:

- Decorate classes
- Nest decorators
- Add arguments to decorators
- Keep state within decorators
- Use classes as decorators

You saw that, to define a decorator, you typically define a function returning a wrapper function. The wrapper function uses `*args` and `**kwargs` to pass on arguments to the decorated function. If you want your decorator to also take arguments, then you need to nest the wrapper function inside another function. In this case, you usually end up with three `return` statements.

You can download the code from this tutorial by clicking below:

If you’re still looking for more, the book [*Python Tricks*](https://realpython.com/products/python-tricks-book/) has a section on decorators, as does the [*Python Cookbook*](https://realpython.com/asins/1449340377/) by David Beazley and Brian K. Jones.

For a deep dive into the historical discussion on how decorators should be implemented in Python, see [PEP 318](https://www.python.org/dev/peps/pep-0318/) as well as the [Python Decorator Wiki](https://wiki.python.org/moin/PythonDecorators). You can find more examples of decorators in the [Python Decorator Library](https://wiki.python.org/moin/PythonDecoratorLibrary). The [`decorator` module](https://github.com/micheles/decorator) can simplify creating your own decorators, and its [documentation](https://github.com/micheles/decorator#documentation) contains further decorator examples.

## Frequently Asked Questions

Now that you have some experience with Python decorators, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial. Click the *Show/Hide* toggle beside each question to reveal the answer.

Python decorators are functions that modify the behavior of other functions or classes. You use them to wrap another function, allowing you to add functionality to existing code without modifying it directly.

You can use decorators to log function calls, measure execution time, enforce access control and authentication, or cache results. They’re a powerful way to separate concerns and enhance code reusability.

To write a custom decorator, you define a function that takes a function as an argument, defines a wrapper function inside it, and returns this wrapper. The wrapper function usually calls the original function and can modify its behavior.

You can apply multiple decorators to a function by stacking them above the function definition. The decorators will be applied from the bottom up, meaning the topmost decorator will wrap all the others.

Yes, the order of decorators matters. Decorators are applied from the innermost to the outermost, so the behavior of a function can change depending on how you order them.

==**Take the Quiz:**== Test your knowledge with our interactive “Decorators” quiz. You’ll receive a score upon completion to help you track your learning progress:

---

[![Python Decorators](https://files.realpython.com/media/Primer-on-Python-Decorators_Watermarked.d0da542fa3fc.jpg)](https://realpython.com/quizzes/decorators/)

**Interactive Quiz**

[Decorators](https://realpython.com/quizzes/decorators/)

In this quiz, you'll revisit the foundational concepts of what Python decorators are and how to create and use them.

Watch Now This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: [**Python Decorators 101**](https://realpython.com/courses/python-decorators-101/)

🐍 Python Tricks 💌

About **Geir Arne Hjelle**

Geir Arne is an avid Pythonista and a member of the Real Python tutorial team.

[» More about Geir Arne](https://realpython.com/team/gahjelle/)

---

*Each tutorial at Real Python is created by a team of developers so that it meets our high quality standards. The team members who worked on this tutorial are:*

Master Real-World Python Skills With Unlimited Access to Real Python

![Locked learning resources](https://realpython.com/static/videos/lesson-locked.f5105cfd26db.svg)

**Join us and get access to thousands of tutorials, hands-on video courses, and a community of expert Pythonistas:**

Master Real-World Python Skills  
With Unlimited Access to Real Python

![Locked learning resources](https://realpython.com/static/videos/lesson-locked.f5105cfd26db.svg)

**Join us and get access to thousands of tutorials, hands-on video courses, and a community of expert Pythonistas:**

Keep Learning

Related Topics: [intermediate](https://realpython.com/tutorials/intermediate/) [python](https://realpython.com/tutorials/python/)

Recommended Video Course: [Python Decorators 101](https://realpython.com/courses/python-decorators-101/)

Related Tutorials:

- [Python args and kwargs: Demystified](https://realpython.com/python-kwargs-and-args/?utm_source=realpython&utm_medium=web&utm_campaign=related-post&utm_content=primer-on-python-decorators)
- [How to Use Generators and yield in Python](https://realpython.com/introduction-to-python-generators/?utm_source=realpython&utm_medium=web&utm_campaign=related-post&utm_content=primer-on-python-decorators)
- [Object-Oriented Programming (OOP) in Python](https://realpython.com/python3-object-oriented-programming/?utm_source=realpython&utm_medium=web&utm_campaign=related-post&utm_content=primer-on-python-decorators)
- [Context Managers and Python's with Statement](https://realpython.com/python-with-statement/?utm_source=realpython&utm_medium=web&utm_campaign=related-post&utm_content=primer-on-python-decorators)
- [Async IO in Python: A Complete Walkthrough](https://realpython.com/async-io-python/?utm_source=realpython&utm_medium=web&utm_campaign=related-post&utm_content=primer-on-python-decorators)

![](https://files.realpython.com/media/Python-Generators-and-the-Yield-Keyword_Watermarked.5380262149de.jpg)

Tutorial

### How to Use Generators and yield in Python

In this step-by-step tutorial, you'll learn about generators and yielding in Python. You'll create generator functions and generator expressions using multiple Python yield statements. You'll also learn how to build data pipelines that take advantage of these Pythonic tools.
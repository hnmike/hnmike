---
title: "BW #122: Economic growth (solution)"
summary: "Analyze World Bank economic data with Pandas: clean, multi-index, plot growth forecasts. Find top downgrades, regional trends. Excel skills++"
source: "https://www.bambooweekly.com/bw-122-economic-growth-solution/"
author:
  - "[[Reuven M. Lerner]]"
published: 2025-06-13
created: 2025-07-10
description: "Get better at: Excel files, cleaning data, working with multi-indexes, window functions, and plotting"
tags:
type :
---
>[!summary]+ This Bamboo Weekly issue (#122) explores global economic growth using World Bank data. It focuses on data cleaning with Pandas, multi-indexes, window functions, and plotting. It analyzes economic forecasts, identifying countries with the largest forecast downgrades and comparing growth projections across different regions. The analysis involves reading Excel files, handling missing data, and creating visualizations to understand economic trends.
13 min read · Tags:


Get better at: Excel files, cleaning data, working with multi-indexes, window functions, and plotting

![BW #122: Economic growth (solution)](https://www.bambooweekly.com/content/images/size/w320/format/webp/2025/06/ChatGPT-Image-Jun-12--2025--02_07_15-AM.png)

BW #122: Economic growth (solution)

*\[Reminder: The 7th cohort of my **Python Data Analysis Bootcamp** (PythonDAB) will start on June 19th! I'm holding another webinar on Sunday with info about this 4-month intense-but-intimate mentoring program in Python, Git, and Pandas. Join me to learn more:* [https://us02web.zoom.us/webinar/register/WN\_TgKu-kiwTVeylzMOQidTZA](https://us02web.zoom.us/webinar/register/WN_TgKu-kiwTVeylzMOQidTZA?ref=bambooweekly.com)*.\]*

Earlier this week, the World Bank released its latest report on "Global Economic Prospects" ([https://www.worldbank.org/en/publication/global-economic-prospects](https://www.worldbank.org/en/publication/global-economic-prospects?ref=bambooweekly.com)). Its projections for economic growth over the coming year had to be revised dramatically since they first came out in January, in no small part because of changes in US trade policy.

### Data and five questions

This week, we'll look at some of the data that the World Bank provided along with their written report, to better understand the current state of the world economy. If you go to the GEP home page ([https://www.worldbank.org/en/publication/global-economic-prospects](https://www.worldbank.org/en/publication/global-economic-prospects?ref=bambooweekly.com)) and open the "more downloads" menu at the center of the page, choose "GDP growth data." That'll download an Excel spreadsheet to your computer with the data we'll be examining.

**Paid subscribers** can download copies of the data files, as well as my notebook, from the end of this message.

**Learning goals for this week** include reading from Excel files, cleaning data, multi-indexes, window functions, and plotting.

### Download the Excel spreadsheet with the World Bank's data, and read the first sheet it into a Pandas data frame. We only want from rows 5 through 34 in Excel. Columns A through D should all be in a four-way multi-index. We do want all of the columns with projections, as well as the differences from earlier this year (columns M and N) to be included. In the columns we'll use for the index, replace NaN with the previous non-NaN value in that column.

People sometimes ask me how I come up with ideas for Bamboo Weekly. This week's topic came from a posting from economist Justin Wolfers on Bluesky ([https://bsky.app/profile/justinwolfers.bsky.social](https://bsky.app/profile/justinwolfers.bsky.social?ref=bambooweekly.com)), who wrote about the World Bank's report. I quickly looked up the report, found that it came with data in Excel format, and excitedly decided to dig in.

But this week demonstrates that just because data is in an Excel spreadsheet doesn't mean that it's easy to parse or work with. The spreadsheet was clearly designed to be a report for human eyes, not input for Pandas. And so if you found that reading this week's data into Pandas was more challenging than usual... well, that's probably the case.

That said, part of my goal with Bamboo Weekly is to expose you to enough real-world data sets, including poorly formatted ones, that you'll learn how to handle even the nastiest of files.

So, let's start by importing Pandas:

```python
import pandas as pd
```

In an ideal world, we could just read the Excel file into Pandas with [`read_excel`](https://bsky.app/profile/justinwolfers.bsky.social?ref=bambooweekly.com):

```python
filename = 'data/GEP-June-2025-GDP-growth-data.xlsx'

df = (
    pd
    .read_excel(filename)
)
```

However, this falls short in a number of ways:

- The headers aren't on the first line of the document
- We don't want all of the columns
- We don't want all of the rows

I'm ignoring the fact that this Excel document contains a number of sheets; we're only interested in the first one, which means we can ignore the others.

We can indicate the line on which the headers are located with the `header` keyword argument. Remember that whereas Excel would say the headers are on line 4, we would call it line 3, since Python starts counting with 0.

I also passed `nrows=30`, so that we would only read 30 rows from the document. Yes, there is more data after those rows, but I decided that things were complex enough without getting the "memorandum items," as the spreadsheet described.

We can ask for a selected number of columns with the `usecols` keyword argument; I normally prefer to use the names, rather than the integers, but these names are odd, and they repeat – so I decided to invoke `usecols` with the column numbers (starting with 0), and then pass `names`, allowing me to rename the columns.

I didn't have a great naming convention for the first four columns, which will constitute our multi-index. So I went with "world", "major\_group", "minor\_group", and "country". Again, this demonstrates even further that this spreadsheet was optimized for human eyes, and not for programs to read.

I also gave names to the remaining columns I loaded. In theory, you can repeat column names in Pandas, just as an index can contain repeated values. But it's a bad idea, and Pandas tries hard to stop us from doing that. And besides, why invite trouble? I thus changed the final two columns, which show the differences between the January forecast and the current forecast, to `2025fd` and `2026fd`, for "forecast differences."

Here's the query so far:

```python
filename = 'data/GEP-June-2025-GDP-growth-data.xlsx'

df = (
    pd
    .read_excel(filename, 
                header=3, nrows=30,
                usecols=[0,1,2,3,5,6,7,8,9,10,12,13],
                names=['world', 'major_group', 'minor_group',
                       'country', '2022', '2023', '2024e',
                       '2025f', '2026f', '2027f', '2025fd', 
                       '2026fd']
               )
)
```

The above query does a decent job of grabbing only the rows we want, and only the columns we want.

In theory, we could then assign the index, either with `index_col` in `read_excel` or with [`set_index`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_index.html?ref=bambooweekly.com). But there is a bit of a problem here, in that the columns we want to use for the index contain a lot of `NaN` values. Those look nice on the page, in that they appear as whitespace – but it's not helpful.

For example, consider lines 7, 8, and 9 of the spreadsheet, with data about the US, euro area, and Japan. That's in column C; column B, which is effectively its heading, should contain the text "Advanced economies." That's because Pandas can't exactly look up and to the left to find out what heading things are under, at least not easily.

I thought about using [`interpolate`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_index.html?ref=bambooweekly.com) to fill in the `NaN` values with whatever non- `NaN` value came above them. But I got a warning from `interpolate`, reminding me that it's really only for numeric data. If I want to interpolate string data, then I should use [`ffill`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.ffill.html?ref=bambooweekly.com) and [`bfill`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.bfill.html?ref=bambooweekly.com), for "forward fill" and "backward fill." By running `ffill` on the four columns I want to use as an index, I can remove the `NaN` values and replace them with the text that came above. Great, right?

Well, mostly: The problem is that we cannot run `ffill` on only a subset of a data frame. So I decided to use [`assign`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.assign.html?ref=bambooweekly.com) to replace the `world` and `major_group` columns with the result of running `bfill` on each of them.

Why didn't I run `bfill` on the other two columns I want in my index? I actually did on `minor_group`, and ran into weird problems. And the countries don't need to be filled; that's the lowest and final part of the hierarchy:

```python
filename = 'data/GEP-June-2025-GDP-growth-data.xlsx'

df = (
    pd
    .read_excel(filename, 
                header=3, nrows=30,
                usecols=[0,1,2,3,5,6,7,8,9,10,12,13],
                names=['world', 'major_group', 'minor_group',
                       'country', '2022', '2023', '2024e',
                       '2025f', '2026f', '2027f', '2025fd', 
                       '2026fd']
               )
    .assign(world = lambda df_: df_['world'].ffill(),
            major_group = lambda df_: df_['major_group'].ffill())
)
```

Finally, with all of this in place, I finally invoked `set_index`, putting my four-level multi-index into place:

```python
filename = 'data/GEP-June-2025-GDP-growth-data.xlsx'

df = (
    pd
    .read_excel(filename, 
                header=3, nrows=30,
                usecols=[0,1,2,3,5,6,7,8,9,10,12,13],
                names=['world', 'major_group', 'minor_group',
                       'country', '2022', '2023', '2024e',
                       '2025f', '2026f', '2027f', '2025fd', 
                       '2026fd']
               )
    .assign(world = lambda df_: df_['world'].ffill(),
            major_group = lambda df_: df_['major_group'].ffill())
    .set_index(['world', 'major_group', 'minor_group', 'country'])
)
```

Sure enough, it worked! I got a data frame with 30 rows and 8 columns. Moreover, all of the columns have a dtype of `float64`, so I know that the data arrived in numeric format.

### Column M, labeled "2025f", shows the percentage point difference from January 2025 predictions. Which five countries' predictions dropped by the greatest amount since the last forecast? What countries (if any) have improved their growth forecast since January?

Now that we have the data, we can perform some calculations. Column M in the original spreadsheet, which has a name `2025fd` in my naming, contains the change from the World Bank's January forecast. (I must admit that I'm not sure what the difference is between a prediction, a forecast, and an estimate, so I apologize to the economists and statisticians for my imprecision.) How can we find the five countries whose values dropped by the greatest amount?

One option is to use [`sort_values`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sort_values.html?ref=bambooweekly.com) and to retrieve the five rows with the smallest values. But I often like to use [`nsmallest`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.nsmallest.html?ref=bambooweekly.com), a method that does the same thing, but more directly:

```python
(
    df['2025fd']
    .nsmallest(10)
)
```

Now, this will return the five countries whose forecast growth was downgraded by the greatest degree. However, don't we want to know the countries' names?

Fortunately, those are in the index. And when we retrieve the five smallest numbers, we'll get the associated index for each one:

```
world  major_group                               minor_group                   country             
World  Emerging market and developing economies  NaN                           Iran, Islamic Rep. 2   -3.2
                                                                               Mexico                 -1.3
                                                                               Thailand               -1.1
                                                                               South Africa           -1.1
       Advanced economies                        United States                 NaN                    -0.9
       Emerging market and developing economies  NaN                           Bangladesh 2           -0.8
                                                 Middle East and North Africa  NaN                    -0.7
                                                 NaN                           Saudi Arabia           -0.6
       Advanced economies                        NaN                           NaN                    -0.5
                                                 Japan                         NaN                    -0.5
Name: 2025fd, dtype: float64
```

Does that look a bit jumbled to you? Yeah, it does – because with four (!) multi-index sections, it's hard to keep things readable. I decided to remove two of the index levels, so that the remaining ones will be readable, using `reset_index`. I not only specified the index levels with their names, but also used `drop=True`, meaning that those index levels shouldn't be turned back into data frame columns, but should rather drop them entirely:

```python
(
    df['2025fd']
    .nsmallest(10)
    .reset_index(level=['world', 'major_group'], drop=True)
)
```

Here's what I get:

```
minor_group                   country             
NaN                           Iran, Islamic Rep. 2   -3.2
                              Mexico                 -1.3
                              Thailand               -1.1
                              South Africa           -1.1
United States                 NaN                    -0.9
NaN                           Bangladesh 2           -0.8
Middle East and North Africa  NaN                    -0.7
NaN                           Saudi Arabia           -0.6
                              NaN                    -0.5
Japan                         NaN                    -0.5
Name: 2025fd, dtype: float64
```

Ah, much easier to read! Granted, the nature of the document means that we need to navigate two columns to know whether we're dealing with a country or a region, but this was good enough to get a good pictures.

We can see that Iran's economic prospects were very seriously downgraded – I mean, by more than 3 percent!?! (Growth figures are typically small, with countries aiming for +2 or +3 percent in a robust year, so losing 3.2 percent seems unfathomably bad.

So Iran has been downgraded by a lot since January. But the United States has been downgraded by 0.9 percent – not as much as Mexico, Thailand, and South Africa, but still a pretty serious hit, especially when we compare the numbers with the Euro area (-0.3) and Japan (-0.5).

### Create a line graph showing all of the growth numbers (past, estimated, and forecast) from 2022-2027 for the three countries in the "advanced economies" group. Do things look like they're getting better, worse, or the same? After the adjustment, how does US economic growth look compared with the euro area and Japan?

The first thing we need to do is retrieve the countries from the "advanced economies" group. Because we used `ffill` earlier, this means that we want all of the rows in which the "major\_group" level of the index is "Advanced economies". We can do this with [`xs`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.xs.html?ref=bambooweekly.com), the method that lets us grab a cross-section of a multi-index with either the rows (the default) or the columns:

```python
(
    df
    .xs('Advanced economies', level='major_group')
)
```

The projection differences from January aren't part of this graph, so we can remove them, by invoking `drop` and specifying which columns to drop:

```python
(
    df
    .xs('Advanced economies', level='major_group')
    .drop(columns=['2025fd', '2026fd'])
)
```

I then once again remove two of the levels from our multi-index, by specifying them and indicating `drop=True`. This is mostly so that the legend on our plot is readable:

```python
(
    df
    .xs('Advanced economies', level='major_group')
    .drop(columns=['2025fd', '2026fd'])
    .reset_index(level=[0,2], drop=True)

)
```

I then remove the first line, which is for the advanced economies as a whole, rather than an individual country:

```python
(
    df
    .xs('Advanced economies', level='major_group')
    .drop(columns=['2025fd', '2026fd'])
    .reset_index(level=[0,2], drop=True)
    .iloc[1:]
)
```

I could then invoke [`plot.line`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.plot.line.html?ref=bambooweekly.com), and get a plot. But remember that when we do that with a data frame, we get one line for each *column*. Right now, the columns are the monthly projections, whereas the rows are the countries. We need to turn that around, flipping the rows with the columns. We can do that with [`transpose`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.transpose.html?ref=bambooweekly.com), or with the alias `T` (which is *not* a method and doesn't take `()`!):

```python
(
    df
    .xs('Advanced economies', level='major_group')
    .drop(columns=['2025fd', '2026fd'])
    .reset_index(level=[0,2], drop=True)
    .iloc[1:]
    .T
    .plot.line()
)
```

We end up with the following plot:

![](https://www.bambooweekly.com/content/images/2025/06/image-1.png)

We can see that there will still be growth in these economies over the coming years, and that the growth will increase. However, we now know that the increase in growth will be much less than would have been the place without the chaos that the US has introduced into the world of international trade.

First, we'll need to retrieve only those rows where the `major_group` column is "Emerging market and developing economies." We can do that, once again, with `xs`:

a

```python
import numpy as np

(
    df
    .xs('Emerging market and developing economies', level='major_group')
)
```

But to remove the countries, and keep the minor groups, we basically need to get rid of any row in which `country` contains a value. Or, to think of it another way, we want to keep only those rows in which `country` is `NaN`.

But we cannot easily do that if `country` is in the index. I thus move `world` (which we don't need) and `country` out of the index, and back into the data frame as columns:

```python
import numpy as np

(
    df
    .xs('Emerging market and developing economies', level='major_group')
    .reset_index(level=['world', 'country'])
)
```

Next, I want to keep only those rows in which `country` has a `NaN` value. I can do that with a combination of [`loc`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.loc.html?ref=bambooweekly.com#pandas.DataFrame.loc), `lambda`, and [`isna`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.isna.html?ref=bambooweekly.com):

a

```python
import numpy as np

(
    df
    .xs('Emerging market and developing economies', level='major_group')
    .reset_index(level=['world', 'country'])
    .loc[lambda df_: df_['country'].isna()]
)
```

Then we (once again) use `drop` to remove the columns that we no longer need. That would be `world` and `country`, as well as the two difference-from-January columns:

```python
import numpy as np

(
    df
    .xs('Emerging market and developing economies', level='major_group')
    .reset_index(level=['world', 'country'])
    .loc[lambda df_: df_['country'].isna()]
    .drop(columns=['world', 'country', '2025fd', '2026fd'])
)
```

In my version of the spreadsheet, I still had a row in which the index was `NaN`. That was weird, but I wanted to get rid of it. So I did, with `drop`:

```python
import numpy as np

(
    df
    .xs('Emerging market and developing economies', level='major_group')
    .reset_index(level=['world', 'country'])
    .loc[lambda df_: df_['country'].isna()]
    .drop(columns=['world', 'country', '2025fd', '2026fd'])
    .drop(np.nan)
)
```

Finally, I again used `T` to transpose our data frame, and then `plot.line` to plot it:

```python
import numpy as np

(
    df
    .xs('Emerging market and developing economies', level='major_group')
    .reset_index(level=['world', 'country'])
    .loc[lambda df_: df_['country'].isna()]
    .drop(columns=['world', 'country', '2025fd', '2026fd'])
    .drop(np.nan)
    .T
    .plot.line()
)
```

And here's what I got:

![](https://www.bambooweekly.com/content/images/2025/06/image-2.png)

As we can see, growth doesn't look great for the East Asia and Pacific region moving forward. Everyone else looks like they're doing well, but (as the World Bank said), not as well as could have been the case.

Sadly, the legend got in the way of the Sub-Saharan Africa projection, mostly because their growth rate was so high! I got rid of the legend with `legend=False`, just to see it:

```python
(
    df
    .xs('Emerging market and developing economies', level='major_group')
    .reset_index(level=['world', 'country'])
    .loc[lambda df_: df_['country'].isna()]
    .drop(columns=['world', 'country', '2025fd', '2026fd'])
    .drop(np.nan)
    .T
    .plot.line(legend=False)
)
```

Here's what I got:

![](https://www.bambooweekly.com/content/images/2025/06/image-3.png)

### Assuming that the estimates and forecasts in this report are accurate, which five countries/regions will see the greatest increase in growth rate from 2022 to 2027? How do you explain the country with the greatest growth?

To answer this question, we need to compare the 2022 growth number with the projected 2027 growth number. We don't really care about the rest of the columns, so we can grab just a subset with `[]`. Note that I have to put a list of columns inside of the `[]`; that returns a new (smaller) data frame:

```python
(
    df
    [['2022', '2027f']]
)
```

What I really want to do now is subtract the 2027 number from the 2022 number. In other words, I want to know if growth will increase or decrease for these places. An easy way to do this is with [`diff`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.diff.html?ref=bambooweekly.com#pandas.DataFrame.diff), known as a "window function," because it compares rows with one another.

Normally, `diff` will tell us the difference between every pair of rows in a data frame. But here, we don't want to compare rows; we want to compare columns! We thus need to pass `axis='columns'` to our invocation of `diff`. And since we only have two columns, we'll get only one result column, the difference between the two. The first column will be replaced with `NaN` values, so we'll just keep the second:

```python
(
    df
    [['2022', '2027f']]
    .diff(axis='columns')
    ['2027f']
)
```

Finally, we can use `nlargest` to find the areas with the highest projected growth:

```python
(
    df
    [['2022', '2027f']]
    .diff(axis='columns')
    ['2027f']
    .nlargest(5)
)
```

I must admit that I was surprised to see that Russia, of all places, was poised for the greatest growth. But then I looked at 2022, when they were at -1.4 (!), presumably because of their invasion of Ukraine. Just emerging from negative growth counts for 1.4 points, so I guess it's not a huge surprise that their growth over the five-year period is projected to be better than many other countries.

That's it for this week!

Here is the data file:

Here is my notebook:

And you can run it at this link in Google Colab: [https://colab.research.google.com/gist/reuven/df108cb4825ced9dc6d0a9cead6d03b8](https://colab.research.google.com/gist/reuven/df108cb4825ced9dc6d0a9cead6d03b8?ref=bambooweekly.com)

I'll be back next week with more puzzles based on current events.

Reuven
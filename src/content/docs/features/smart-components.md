# Smart components (work in progress)

**/!\ This work is still in progress, expect a finalized version by the end of 2021**

## SmartForm

Vulcan is historically about making it easy to spawn the most generic part of an application, based
on the structure of your data.

For instance, say you have an `Article` model and an `Author` model.
Vulcan is able to generate a form automatically, depending on the actual fields of each model.

For the `Author`, it could be first name, last name, and date of birth.
For the `Article`, it could be the title, content, and the author unique id.


## Smart Admin Area

Based on the `SmartForm`, it's possible to spawn a full admin area for all the models of your application.
As easy as writing a loop!

You can see a demonstration of this approach in `src/pages/admin`, or in your application by opening
`http://localhost:3000/admin`.


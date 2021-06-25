# Python-Autograder-KMUTT 🐍
🚀 Deploy on Heroku https://sleepy-reef-63280.herokuapp.com/

## Build with Mern stack
- [React](https://reactjs.org/docs/getting-started.html)
- [Redux](https://redux.js.org/introduction/getting-started)
- [NodeJS](https://colab.research.google.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Function
- ✅   Register
- ✅   Login
- ✅   Create Edit and Delete course
- ✅   Search course
- ✅   Upload and Edit question
- ✅   Search question
- ✅   Edit role
- ✅   Invite Remove student
- ✅   Create Edit and Delete assignment
- ✅   View Edit score

### Role
| Function               | Student  |  Admin   |
| ---------------------- | :------: | :------: |
| Register               | &#10003; |          |
| Login / Logout out     | &#10003; | &#10003; |
| Create course          |          | &#10003; |
| Edit Course            |          | &#10003; |
| Delete Course          |          | &#10003; |
| Search Course          | &#10003; | &#10003; |
| Upload Question        |          | &#10003; |
| Edit Question          |          | &#10003; |
| Delete Question        |          | &#10003; |
| Search Question        |          | &#10003; |
| Edit Role              |          | &#10003; |
| Search user            |          | &#10003; |
| Add Student            |          | &#10003; |
| Remove Student         |          | &#10003; |
| Search Student         | &#10003; | &#10003; |
| Create Assignment      |          | &#10003; |
| Edit Assignment        |          | &#10003; |
| Delete Assignment      |          | &#10003; |
| Search Assignment      | &#10003; | &#10003; |
| Submit Assignment      | &#10003; |          |
| Edit Submit Assignment | &#10003; |          |
| Edit Score             |          | &#10003; |


## Usage
Get started by cloning this repository.
```
git clone https://github.com/Achiratch/Python-Autograder-KMUTT.git
```
Then installing the dependencies and starting the development server.
```
npm i
cd client
npm i
cd ..
```

```
npm run dev
```
You can login with the admin id below.

Student ID : 99999999999<br>
Password   : 123456

## How to write file question

After install project, you can start writing file in the
format below. These will be dynamically converted to exercises.

To upload files, you can only be uploaded as .txt or .py files.

```html
<div data-datacamp-exercise data-lang="python">
	<code data-type="pre-exercise-code">
		# This will get executed each time the exercise gets initialized
		b = 6
	</code>
	<code data-type="sample-code">
		# Create a variable a, equal to 5


		# Print out a


	</code>
	<code data-type="solution">
		# Create a variable a, equal to 5
		a <- 5

		# Print out a
		print(a)
	</code>
	<code data-type="sct">
		test_object("a")
		test_function("print")
		success_msg("Great job!")
	</code>
	<div data-type="hint">Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.</div>
</div>
```

As we can see in the example, the whole exercise is contained in a single
`<div>` element with two data attributes `data-datacamp-exercise` and
`data-lang`. The first attribute `data-datacamp-exercise` indicates that the
`<div>` should be treated as a DataCamp Light exercise, while the other
attribute `data-lang` specifies which programming language should be used. The
accepted values for `data-lang` are `r` and `python`. There is also an optional
attribute `data-height` which can sets the height in `px` of the div (minimum
height is `300px`) or set the size according to the amount of sample code lines:
`data-height="auto"`.


### Pre-Exercise Code

Pre-exercise code is executed when the R/Python session is initialized. You can
use it to pre-load datasets, packages, etc. for students. The way to specify
this is by defining a `<code>` tag containing your initialization code and set
the `data-type` attribute to `pre-exercise-code` like this:

```html
<code data-type="pre-exercise-code">
	# This will get executed each time the exercise gets initialized
	b = 6
</code>
```

In our example we initialize the (rather useless) variable `b` with value `6`.



### Sample Code

To set the sample code that will be present initially in the code editor, a
`<code>` tag should be defined containing the sample code and the `data-type`
attribute should be set to `sample-code` like this:

```html
<code data-type="sample-code">
	# Create a variable a, equal to 5


	# Print out a


</code>
```

Our example simply shows a couple of comments together with some newlines. The
JavaScript library also takes care of stripping leading indentation so no need
to worry about that.



### Solution

To set the solution code, a `<code>` tag should be defined containing the
solution code and the `data-type` attribute should be set to `solution`
like this:

```html
<code data-type="solution">
	# Create a variable a, equal to 5
	a <- 5

	# Print out a
	print(a)
</code>
```



### Submission Correctness Test (SCT)

A Submission Correctness Test is used to check whether the code submitted by the
user properly solves the exercise. For detailed information on this you can look
at [the documentation for R](https://github.com/datacamp/testwhat) and at [the
documentation for Python](https://github.com/datacamp/pythonwhat). The way to
specify the SCT is by defining a `<code>` tag containing your SCT code and set
the `data-type` attribute to `sct` like this:

```html
<code data-type="sct">
	test_object("a")
	test_function("print")
	success_msg("Great job!")
</code>
```

In our example the first line checks whether the user declared the variable `a`
and whether its value matches that of the solution code. The second line checks
whether the `print` function is called and lastly a success message is specified
that will be shown to the user when the exercise is successfully completed.



### Hint

To specify a hint, a tag should be defined containing the hint and the
`data-type` attribute should be set to `hint` like this:

```html
<div data-type="hint">
    Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.
</div>
```

It is possible for the hint to contain for instance `<code>` tags as is the case in our example.


## Learn more
You can learn more about how to create SCT file at
[Pythonwhat](https://pythonwhat.readthedocs.io/en/latest/)

You can learn more about how to implement DataCamp Light at 
[DataCamp Light](https://github.com/datacamp/datacamp-light)

## License
[King Mongkut’s University of Technology Thonburi](https://www.kmutt.ac.th/en/)

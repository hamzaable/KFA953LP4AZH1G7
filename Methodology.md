
# Evaluation : 
UI > [compliance , stability ,  manners ] 
codebase > [readability , reuseability , seperation , styling?]


# Things to do before starting project
- read github api docs
- antd design doc

# External packages installed
- antD for UI
- axios for fetching data
# Data Flow : 
- Initially fetch list of all organization and show them in select box
> on selection > show other filters
               > fetch list of repositories in that organization

# Things to check at the end 
- Form Validation -done
- error if wrong organization entered - select box so not possible to enter wrong
- filters change should re-fetch ? - clear filter button added
- Submit button only show incase of invalid data - invalid data made not possible to enter
- Loading State - done
- check pagination -done
- Typescript types-done
- Add comments in code where necessary - done


# Steps 

- installed react
- cleaning files and structuring folders
- install antD library
- make fetch hook
- Table Added
- Pagination added in table

# fetch urls sample
for orgs : https://api.github.com/search/users?q=type:org&per_page=100
for repos: https://api.github.com/search/repositories?q=org:adobe+in:name+stars:<=5555500+help-wanted-issues:>=0&order=asc&per_page=7&page=1
for org total repos: https://api.github.com/orgs/github

# challenges happened during development
> Github organization Api only allow return of 100 organization per page. since we are using selection box we cannot do pagination so maximum 100 organization is used for combobox.
> I can fetch more data on going to end of list but then auto completion feature will not work
because it will not be able to auto complete organization name which is still needs to be loaded
> I assume you mean to pull only open source organization which are only handfull
https://github.com/collections/open-source-organizations 
> github do not provide api for organizations list in open source collection so I will have to input them as array. 
> Removed fetch from organization
> Rest api does not provide support for number of open issues . So filtering on frontend.



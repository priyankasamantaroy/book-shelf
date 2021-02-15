[33mcommit cab4bdd4224f346452e379da1a13583a71056a6d[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: priyanka <priyanka.samantaroy@gmail.com>
Date:   Sat Feb 13 20:15:37 2021 +0000

    feat:   added search component
    
    This component will render the books depends on search  query
    The state with query and searchbooks property will update by calling books api search method declaired with updateQuery method
    An error has occured wile rmendering search books and displayed an error message in console,need to fix that.

[33mcommit 68eae5cf4a0a2dc1cfdd429ad90eb9a76f2a155e[m
Author: priyanka <priyanka.samantaroy@gmail.com>
Date:   Thu Feb 4 19:19:02 2021 +0000

    refactor: Refactoring all 3 different components into a single component
    
    Initially there weree 3 different components that was rendering the three different bookshelfs.
    Now created single Rack component that will render the same with different props passed by.
    Delaired an array with different shelf name that will passed through props and will render the drop downbox
    that with show the options other than the active shelf.

[33mcommit ac841d4f231638ee29a0b599864a004161cfc86f[m
Author: priyanka <priyanka.samantaroy@gmail.com>
Date:   Thu Feb 4 11:20:17 2021 +0000

    component1:Rack
    Description:
    1.This Component will render the bookshelf along with designated books
    2.there are 3 props passed along with:bookshehtitle prop/bookshelfname prop/Books prop
    3.This same  component will render three time depending on their different props that has passed on.

[33mcommit fd55502e1ae7c02dc454409ef6b121db79244f72[m
Author: priyanka <priyanka.samantaroy@gmail.com>
Date:   Tue Feb 2 19:56:08 2021 +0000

    feting data using getAll to get the books data

[33mcommit e8a32304671c60b92c48c8964c85a738cecebafa[m
Author: priyanka <priyanka.samantaroy@gmail.com>
Date:   Tue Feb 2 19:39:27 2021 +0000

    first backup before start

[33mcommit 1d29039399c70531ca31645ca187c8257c77a1c4[m
Author: Richard Kalehoff <richardkalehoff@gmail.com>
Date:   Wed Aug 30 17:52:41 2017 -0700

    Modify project for Workspaces

[33mcommit f55abf3992c39430e29ef8d9fb49da09ec265201[m
Author: Richard Kalehoff <richardkalehoff@gmail.com>
Date:   Wed Aug 30 13:34:10 2017 -0700

    Initial commit

exports.getLogin = (req, res, next) => {
    let isLoggedIn =
        req
            .get('Cookie')
            .split(';')[1]
            .trim()
            .split('=')[1] === 'true'; // Find cookie
    isLoggedIn = true;
    console.log(isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; HttpOnly');
    res.redirect('/');
};

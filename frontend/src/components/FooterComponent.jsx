import React from 'react'

const FooterComponent = () => {
    return (
        <div>
            <footer className="footer bg-dark text-white mt-5 p-4 text-center">
                <div className="container">
                    <span>&copy; {new Date().getFullYear()} TaskFlow. All Rights Reserved.</span>
                </div>
            </footer>

        </div>
    )
}

export default FooterComponent
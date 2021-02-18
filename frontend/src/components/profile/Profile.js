import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { getCurrentUserPosts } from "../../actions/posts";

//custom compoenents
import Spinner from "../layout/CustomSpinner";
import colorScheme from "../../styles/mainColorPallete";

const DisplayPosts = ({ userRecipes }) => {
  return userRecipes.map((recipe) => {
    return (
      <div key={recipe._id}>
        <Link to={`/posts/${recipe._id}`}>{recipe.title}</Link>
      </div>
    );
  });
};

const ProfileHeader = ({ user, profile }) => {
  // console.log(user);
  // console.log(profile);
  return (
    //Image
    //Avatar
    //Degree
    //Name
    <>
      <div style={{ display: "flex", backgroundColor: colorScheme.pale }}>
        <img
          src={user.avatar} //refactored to allow users to edit their profile pics
          alt="new"
          style={{
            height: 80,
            width: 80,
            borderRadius: 100,
            borderColor: "grey",
            borderWidth: 2,
            margin: 5,
            alignSelf: "center",
          }}
        />
        <div>
          <div>
            <h2>{user.name}</h2>
          </div>
          <div>{user.degree}</div>
          <div>{user.university}</div>
          {profile.bio}
        </div>

        {/* total posts */}
      </div>
      <div style={{ backgroundColor: colorScheme.pale, paddingTop: 5 }}>
        {profile.bio === null ? <> user has no bio </> : profile.bio}
      </div>
    </>
  );
};

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    getCurrentProfile();
    getCurrentUserPosts().then((recipesArray) => {
      console.log(recipesArray);
      setUserRecipes(recipesArray);
    });
  }, []);

  // the profile is loading
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <>
      <ProfileHeader user={user} profile={profile} />

      <div>Tabs for posts, saved, locked</div>
      <DisplayPosts userRecipes={userRecipes}/>
    </>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);

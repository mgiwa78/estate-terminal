import { Text, View } from "@common/Themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useGetInvitesQuery } from "@toolkit/invitesApi";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { scaleFont } from "../../utils/scaleFont";
import Invite from "./Invite";
import { RefreshControl } from "react-native-gesture-handler";
// import {Invite as InviteType} from "./Invite";

type PropInvite = {
  filter: "all" | "pending" | "cleared";
  limit?: number;
};

const Invites = ({ filter = "all", limit }: PropInvite) => {
  const user = useSelector(selectUser);

  const { data, error, isLoading, isFetching, refetch } = useGetInvitesQuery(
    user?._id || "0"
  );
  const [filtered, setFiltered] = useState();

  if (error) {
    console.log(error);
  }
  return (
    <>
      <View style={styles.container} lightColor="#f2f2f2">
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.body} lightColor="#f2f2f2">
            {limit && (
              <FlatList
                contentContainerStyle={styles.scrollViewContent}
                data={data?.slice(0, limit).sort((a, b) => {
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  return dateA.getTime() - dateB.getTime();
                })}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Invite invite={item} />}
                refreshControl={
                  <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                }
              />
            )}

            {!limit &&
              data &&
              (data?.filter((invite) => {
                if (filter === "all") {
                  return true;
                }
                if (filter === "cleared") {
                  return invite.status;
                }
                if (filter === "pending") {
                  return !invite.status;
                }
              }).length > 0 ? (
                <FlatList
                  data={data?.filter((invite) => {
                    if (filter === "all") {
                      return true;
                    }
                    if (filter === "cleared") {
                      return invite.status;
                    }
                    if (filter === "pending") {
                      return !invite.status;
                    }
                  })}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <Invite invite={item} />}
                  refreshControl={
                    <RefreshControl
                      refreshing={isFetching}
                      onRefresh={refetch}
                    />
                  }
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontFamily: "ManropeRegular", color: "#000" }}>
                    No Invites
                  </Text>
                </View>
              ))}

            {isLoading && <ActivityIndicator size={"large"} />}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(18),
    fontFamily: "ManropeSemiBold",
    textAlign: "left",
  },
  invitesTab: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  scrollViewContent: {
    width: "100%",
  },
  container: {
    textAlign: "left",
    width: "100%",
    gap: 14,
    paddingTop: 5,
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 14,
    width: "100%",
    height: "100%",
    paddingTop: 2,
    paddingHorizontal: 2,
    marginBottom: 280,
  },
});

export default Invites;

---
title: Setting Up Obsidian Git Sync On All Platforms
date: '2023-01-31'
excerpt: The all-in-one solution
---

<script>
  import Image from '$lib/components/image.svelte';
</script>

## Introduction

These past few months, I've started using [Obsidian](https://obsidian.md/) as my main note-taking tool. So far I've been enjoying it very much, however, I had one small unresolved problem with it: namely how to sync notes across all my devices for free in a convenient way. While Obsidian offers an $8/month solution called [Obsidian Sync](https://obsidian.md/sync), I wanted a way that is separate from Obsidian, preferably for free.

This blog post serves to detail my findings about this matter, mainly so others (including myself) can benefit from the information being collected into a centralized location on the Internet.

## Requirements

For this to work the way I want, I set the following requirements:

- Work across Windows, Linux, MacOS, Android, iOS/iPadOS (yes, I use every platform in this list)
- Be comfortable to use, preferably minimal amounts of command-line magic each time I want to update my notes on a given device, as otherwise I won't use my notes if it has a large overhead
- Be free of charge
- Don't have strict storage restrictions, so I can have a large number of notes and images

## Methods Considered

Before choosing a path to go down on, I considered some alternatives, of which only one was viable in the end.

### Google Drive

One of the easiest methods to share notes across devices. We can install the Google Drive app on our computer or phone, and the notes will automatically sync between all the devices. Then, in Obsidian, we can open the folder in Google Drive as a vault, and access all our notes easily.

There's just one catch though: namely, that this does not work on iOS, because it [does not allow Obsidian to access files in the sandbox of Google Drive](https://forum.obsidian.md/t/sync-obsidian-note-between-an-ipad-and-an-an-samsung-android-phone-using-google-drive/32396), where the files are actually stored. Sadly, it means that this option is out of the question, as I'd really prefer to have my notes on my iPad as well if possible, but for others, this method can work very well.

#### Pros

- Works on: Windows, Linux, MacOS, Android (have to install Google Drive app)
- Very easy, once set up it does not require any manual intervention, it "just works"

#### Cons

- Does not work on iOS/iPadOS
- The free Google Drive tier only allows 15GB of storage, though 100GB is very cheap

### iCloud

Another cloud-based storage provider from Google's competitor, Apple. This means that syncing across Apple devices works flawlessly, even for Obsidian vaults, but falls short everywhere else, as iCloud sync is not available for Windows, Linux or Android.

#### Pros

- Works on: MacOS, iOS/iPadOS
- Easy to set up and use on supported platforms

#### Cons

- Does not work on Windows, Linux, Android
- Only 5GB of free storage

### GitHub

Finally, we arrive at the solution I went with in the end, though it took a quite a bit of setup to achieve the ease of use I strove for in the beginning. Basically, I chose to store my vault in a private GitHub repository, from where all my devices can access it. In the next part of this post, I'll share the exact steps I took for all platforms, but first, let's see the pros and cons.

#### Pros

- Works on all platforms, though some initial setup is required
- Maximum repository size is 100GB, though there are some warnings at 5GB and 75GB (refer to this [StackOverflow thread](https://stackoverflow.com/questions/38768454/repository-size-limits-for-github-com) for more info)

#### Cons

- Have to configure some extra things, especially on mobile
- Storing large amounts of data in a Git repository is not ideal

## Setting Up GitHub Sync

Alright, so let's cut to the chase and see how to set up GitHub synchronization for Obsidian, platform by platform.

### PC/Mac

Sync setup is easiest for PCs and Macs, so I'll get these out of the way first:

1. Make sure to have `git` installed on your system (on Linux and Mac it's pre-installed, on Windows use the [installer](https://git-scm.com/downloads))
2. If you already have a vault on GitHub, clone it to your system (If you don't have a vault yet, create a new repository on GitHub, and clone it to your computer)
3. Open the newly cloned folder as a vault
4. If you want, create a `.gitignore` to exclude the `.obsidian/` and `.trash/` folders
5. Install the [Obsidian Git](https://github.com/denolehov/obsidian-git) plugin, which enables running Git commands inside Obsidian itself

This should be it for PCs, now you can pull, commit and push changes inside Obsidian by using the command palette (Ctrl/Cmd + P)

<Image src="/images/posts/obsidian-git-sync/obsidian-git-command-palette.png" alt="Obsidian Git Command Palette" />

### Mobile

Next comes the fun part, setting up the sync on mobile devices. The flow is similar for both iOS and Android, mainly differing in the apps that need to be installed.

Now, you could ask: Couldn't I just use the Obsidian Git plugin as well on mobile and be done with it? To which I'd say: yes, but only with restrictions. This is because for the mobile apps, Obsidian Git uses a Git re-implementation called [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git), written in pure JavaScript, so it can be truly platform-independent.

This sounds good on paper, however, it means that its resource usage is much higher, leading to its biggest problem for our mobile sync: if we have a large number of changes to pull, or a large repository to clone, it will consume all the memory provided to Obsidian, crashing the application.

<Image src="/images/posts/obsidian-git-sync/obsidian-git-mobile-disclaimer.png" alt="Obsidian Git mobile disclaimer" />

To address this issue, I opted to set up a terminal environment on my mobile devices, where I can use a native Git implementation, which does not suffer from this problem. This makes synchronization a bit more tedious on mobile, but if you make sure to pull changes frequently using Obsidian Git, you should not run into many issues, but if you do, you have a fail-safe way to fetch those huge commits.

#### Authentication

Before diving into the platform-specific details, we need to see what authentication methods we have available for mobile:

- Obsidian Git only supports password/token authentication, so it's advisable to create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with read/write permissions to your vault repository only (make sure to save this token somewhere safe, as once created, you'll not be able to see it again!)
- For the mobile terminals, it's easiest to use SSH authentication, although for now I opted to use my personal access token here as well - downside is that I have to type/paste it every time I want to pull/push changes (though as I only do it rarely through the terminal, it's not a huge issue for me)

Now we're ready to dive into the nitty-gritty details of the setup on both platforms. Also, I'd advise first setting up the repository on GitHub and on a PC, as that makes setup on mobile easier.

#### iOS

For iOS, I referred to this [thread](https://forum.obsidian.md/t/mobile-automatic-sync-with-github-on-ios-for-free-via-a-shell/46150) when setting up [a-Shell](https://holzschu.github.io/a-Shell_iOS/), a very nice and performant terminal for the Apple mobile ecosystem, while I used the [wiki](https://github.com/denolehov/obsidian-git/wiki/Installation) for configuring Obsidian Git.

The initial setup differs a bit depending on how you want to clone the repo, but after that it's the same for both. If you have a small repository in GitHub, I advise to clone it using the Obsidian Git plugin first, and then set up the a-Shell integration second. If you already have a large repository, then you should clone it using a-Shell, then open it in Obsidian and set up Obsidian Git after.

First, let's see the steps when you have a small repository, which Obsidian Git can handle:

1. Download [Obsidian](https://apps.apple.com/us/app/obsidian-connected-notes/id1557175442) and [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) from the App Store
2. Open Obsidian, create a new vault, and don't select "Store in iCloud"
3. Go to Settings, enable Community Plugins, install Obsidian Git, then enable it
4. Go to Obsidian Git options (under Community Plugins)
5. Under "Authentication/Commit Author":
   1. Username: your GitHub username
   2. Password/Personal Access Token: the token you created on GitHub
   3. Author name: your full name
   4. Author email: your email (these 2 are required for pushing changes)
6. Exit Settings, then open the Command Palette by dragging downward in the editor area
7. Select "Obsidian Git: Clone existing remote repo"
8. Put in your GitHub repository URL, make sure it ends with `.git`
9. Choose "No" at the next prompt
10. Restart the app when it tells you in a popup
11. Now, it's time to set up a-Shell, so open it
12. Run the `pickFolder` command, which will open a file explorer-like UI
13. Select Obsidian, essentially `cd`ing into the directory Obsidian uses on the device to store vaults
14. To save this location for later use, run `renamemark Documents Obsidian` (later, you can `cd` straight into this folder by running `jump Obsidian`)
15. If you run `ls`, you should be able to see your vault that Obsidian Git cloned
16. `cd` into it, and then run `lg2 status` (in a-Shell, Git is implemented with [libgit2](https://libgit2.org/), a portable implementation of git, so the binary name is `lg2`)
17. To check whether everything is in order, run `lg2 pull`, and put in your username+token when asked
18. If it complains about a setting being wrong, run the command it suggests at the end of the error message, then try again
19. You can also set up SSH authentication:
    1. `cd` back into the home directory by running `cd`
    2. Run `ssh-keygen -t ed25519 -C "<your-email>"`
    3. `cd .ssh`, then run `cat id_ed25519.pub`
    4. Copy the output, then go to [SSH and GPG Keys](https://github.com/settings/keys) on GitHub
    5. Click new SSH key
    6. Add a name and the public key
    7. Now if you run `lg2 pull`, it should work without asking for credentials

If your vault is already large and Obsidian Git has problems cloning it, then you have to do these steps in reverse order, meaning that you'll clone the repo using `lg2`, and then set up Obsidian Git after:

1. Download [Obsidian](https://apps.apple.com/us/app/obsidian-connected-notes/id1557175442) and [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) from the App Store
2. Open Obsidian, create a new dummy vault, and don't select "Store in iCloud" (this makes the Obsidian folder appear later when using a-Shell)
3. Open a-Shell, run the `pickFolder` command, which will open a file explorer-like UI
4. Select Obsidian, essentially `cd`ing into the directory Obsidian uses on the device to store vaults
5. To save this location for later use, run `renamemark Documents Obsidian` (later, you can `cd` straight into this folder by running `jump Obsidian`)
6. Run `lg2 clone <repo-url>`
7. Put in your GitHub username and token
8. You can also set up SSH auth, method is detailed at the end of the steps above
9. Open Obsidian, exit the dummy vault, and your cloned one should be there in the list
10. Enter your freshly cloned vault
11. Go to Settings, enable Community Plugins, install Obsidian Git, then enable it
12. Go to Obsidian Git options (under Community Plugins)
13. Under "Authentication/Commit Author":
    1. Username: your GitHub username
    2. Password/Personal Access Token: the token you created on GitHub
    3. Author name: your full name
    4. Author email: your email (these 2 are required for pushing changes)
14. Now you should be able to pull/push changes from inside the app

#### Android

Setup for Android is quite similar, and just differs in the terminal app being used. I opted for [Termux](https://termux.dev/en/), as it's a widely used terminal for Android that works without root and offers packages through APT. Here we can also set our vault up in 2 different ways, depending on which app we choose to clone the repository first.

For small repositories, you can start with Obsidian Git and set up Termux after:

1. Download [Obsidian](https://play.google.com/store/apps/details?id=md.obsidian&hl=en&gl=US) from the Play Store and [Termux](https://f-droid.org/en/packages/com.termux/) From F-Droid
2. Open Obsidian, create a new vault, put it in the `Documents` folder (you can put it anywhere, it's just an easy place to find later)
3. Go to Settings, enable Community Plugins, install Obsidian Git, then enable it
4. Go to Obsidian Git options (under Community Plugins)
5. Under "Authentication/Commit Author":
   1. Username: your GitHub username
   2. Password/Personal Access Token: the token you created on GitHub
   3. Author name: your full name
   4. Author email: your email (these 2 are required for pushing changes)
6. Exit Settings, then open the Command Palette by dragging downward in the editor area
7. Select "Obsidian Git: Clone existing remote repo"
8. Put in your GitHub repository URL, make sure it ends with `.git`
9. Choose "No" at the next prompt
10. Restart the app when it tells you in a popup
11. Open Termux, run `termux-setup-storage` to get storage permissions
12. Run `pkg update && pkg install git`
13. Then `cd storage/shared/Documents/<repo-name>` (If this does not work, restart Termux or revoke storage access then run `termux-setup-storage` again, it's a [known issue](https://wiki.termux.com/wiki/Termux-setup-storage))
14. Run `git pull`, enter credentials
15. If it complains about a setting being wrong, run the command it suggests at the end of the error message, then try again
16. You can also set up SSH authentication:
    1. `cd` back into the home directory by running `cd`
    2. Run `ssh-keygen -t ed25519 -C "<your-email>"`
    3. `cd .ssh`, then run `cat id_ed25519.pub`
    4. Copy the output, then go to [SSH and GPG Keys](https://github.com/settings/keys) on GitHub
    5. Click new SSH key
    6. Add a name and the public key
    7. Now if you run `git pull`, it should work without asking for credentials

Finally, let's see the scenario where your repository is already large, so we can only get it using Termux:

1. Download [Obsidian](https://play.google.com/store/apps/details?id=md.obsidian&hl=en&gl=US) from the Play Store and [Termux](https://f-droid.org/en/packages/com.termux/) From F-Droid
2. Open Termux, run `termux-setup-storage` to get storage permissions
3. Run `pkg update && pkg install git`
4. Then `cd storage/shared/Documents` (If this does not work, restart Termux or revoke storage access then run `termux-setup-storage` again, it's a [known issue](https://wiki.termux.com/wiki/Termux-setup-storage))
5. Run `git clone <repo-url>`, enter credentials
6. You can also use SSH authentication, detailed in the previous set of steps
7. Now Open Obsidian, select "Open folder as vault", and navigate to `Documents`, where you should see the cloned repo
8. Open it
9. Go to Settings, enable Community Plugins, install Obsidian Git, then enable it
10. Go to Obsidian Git options (under Community Plugins)
11. Under "Authentication/Commit Author":
    1. Username: your GitHub username
    2. Password/Personal Access Token: the token you created on GitHub
    3. Author name: your full name
    4. Author email: your email (these 2 are required for pushing changes)
12. Now you should be able to pull/push changes from inside the app

## Wrap-Up

Well, this is it, now you can set up full synchronization between your devices in a fairly effortless way. I've been using this setup for 2 months now, and it has truly been a breeze. Most of the time, if I update the repo frequently on my mobile devices, I can make do with Obsidian Git, but in case I added lots of stuff at once, I can always just use the terminal for one quick pull. Keep in mind however, that maybe these workarounds might not work on very large repositories, though I have not run into any issues yet, with my now ~70MB vault (which is admittedly, not that large).
